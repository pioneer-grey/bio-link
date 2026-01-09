import { useQuery } from "@tanstack/react-query";
import axios from "axios"

export const getPage=()=>{
   const {data,isLoading,isError} = useQuery({
        queryKey:["getPage"],
        queryFn:async()=>{
            const res=await axios.get("/api/dashboard")
            return res.data
        }
    })
    return {data,isLoading,isError}
}