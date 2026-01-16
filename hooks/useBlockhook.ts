import { useEffect } from "react";
import {getBlocks,updateBlock} from "@/actions/block"
import { useBlock } from "@/store/useBlocks";

export const useBlockhook=()=>{
    const{data}=getBlocks()
    const{mutateAsync}=updateBlock()
    const{block,lastState,setBlock}=useBlock()

    useEffect(() => {
        if (data?.blocks) {
            setBlock(data?.blocks)
        }
    }, [data])

}