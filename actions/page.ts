import { useQueryClient, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"


export function AddUsername() {
const queryClient = useQueryClient();

  const {mutateAsync,isPending}= useMutation({
    mutationFn: async (userName: string) => {
      const res = await axios.post("/api/page", { userName })
      return res.data
    },
    onSuccess:()=>{
         queryClient.invalidateQueries({ queryKey: ['getPage'] });
    },
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

export function UploadAvatar(){
  const queryClient = useQueryClient();

  const {mutateAsync,isPending}= useMutation({
    mutationFn: async (file: File) => {
      
      if (!file) return;

       const formData = new FormData();
       formData.append('avatar', file);
      const res = await axios.put("/api/page/profile",formData)
      return res.data
    },
    onSuccess:()=>{
         queryClient.invalidateQueries({ queryKey: ['getPage'] });
    },
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


export function UpdateHeader(){
  const queryClient = useQueryClient();

  const {mutateAsync,isPending}= useMutation({
    mutationFn: async (values:{name:string,bio:string}) => {
      const res = await axios.put("/api/page/header",values)
      return res.data
    },
    onSuccess:()=>{
         queryClient.invalidateQueries({ queryKey: ['getPage'] });
    },
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
