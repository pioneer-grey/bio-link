import { create } from 'zustand'
import { styles } from "@/store/types"

type Styles = {
    styles: styles | null,
    setStyles: (styles: styles) => void,

    setPrimaryTextColor: (value:string) => void,
    setPrimaryBackground: (value:string) => void,
    setDesktopBackgroundColor: (value:string) => void,

    setProfilePictureShadow: (value:number) => void,
    setProfilePictureBorder: (value:number) => void,
    setSocialIconSize: (value:number) => void,

    setCardColor: (value:string) => void,
    setCardTextColor: (value:string) => void,
    setCardCorner: (value:number) => void,
    setCardBorder: (value:number) => void,
    setCardBorderColor: (value:string) => void,
    setCardShadow: (value:number) => void,
    setCardSpacing: (value:number) => void,

}

export const useStyles=create<Styles>()((set)=>({
    styles:null,
    setStyles:(styles)=>set({styles}),

    setPrimaryTextColor:(primaryTextColor)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
                primaryTextColor,
            },
        }
    }),

       setPrimaryBackground:(primaryBackground)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
                primaryBackground,
            },
        }
    }),

       setDesktopBackgroundColor:(desktopBackgroundColor)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
                desktopBackgroundColor,
            },
        }
    }),

       setProfilePictureShadow:(profilePictureShadow)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
                profilePictureShadow,
            },
        }
    }),

       setProfilePictureBorder:(profilePictureBorder)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
                profilePictureBorder,
            },
        }
    }),

    setSocialIconSize:(socialIconSize)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
                socialIconSize,
            },
        }
    }),

     setCardColor:(cardColor)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
                cardColor
            },
        }
    }),
     setCardTextColor:(cardTextColor)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
                cardTextColor
            },
        }
    }),
     setCardCorner:(cardCorner)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
            cardCorner
            },
        }
    }),
     setCardBorder:(cardBorder)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
                cardBorder
            },
        }
    }),
     setCardBorderColor:(cardBorderColor)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
               cardBorderColor
            },
        }
    }),
     setCardShadow:(cardShadow)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
                cardShadow
            },
        }
    }),
     setCardSpacing:(cardSpacing)=>set((state)=>{
        if(!state.styles) return state
        return {
            styles:{
                ...state.styles,
                cardSpacing,
            },
        }
    }),


}))