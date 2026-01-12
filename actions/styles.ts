import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { styles } from "@/store/types";

export function UpdateStyles(){
  const queryClient = useQueryClient();

  const {mutateAsync,isPending}= useMutation({
    mutationFn: async (values:styles) => {
      const res = await axios.put("/api/page/styles",values)
      return res.data
    },
    // onSuccess:()=>{
    //      queryClient.invalidateQueries({ queryKey: ['getPage'] });
    // },
     onError: (error: any) => {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message ??
        "Something went wrong. Please try again."
      )
    } else {
      toast.error("Unexpected error occurred")
    }
  },
})
  return {mutateAsync,isPending}
}