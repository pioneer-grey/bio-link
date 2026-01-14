import { create } from 'zustand'
import {icon} from "./types"

type Icon ={
    icon:icon[]|null,
    setIcon:(icon:icon[])=>void
}

export const useIcon=create<Icon>()((set) => ({
    icon:null,
    setIcon: (icon) => set({icon}),
}))