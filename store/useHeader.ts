import { create } from 'zustand'
import { header } from "@/store/types"

type Header = {
    header: header | null,
    setName: (name: string) => void,
    setBio: (bio: string) => void,
    setHeader: (header: header) => void
}

export const useHeader = create<Header>()((set) => ({
    header: null,
    setHeader: (header) => set({ header }),
    setName: (name) =>
        set((state) => {
            if (!state.header) return state

            return {
                header: {
                    ...state.header,
                    name,
                },
            }
        }),

    setBio: (bio) =>
        set((state) => {
            if (!state.header) return state

            return {
                header: {
                    ...state.header,
                    bio,
                },
            }
        }),
}))