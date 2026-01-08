"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


export async function signup(formData:FormData){
    const email=formData.get("email") as string
    const name=formData.get("name") as string
    const password=formData.get("password") as string

    await auth.api.signUpEmail({
        body:{
            email,
            password,
            name
        }
    })
    redirect("/dashboard")
}
export async function signin(formData:FormData){
    const email=formData.get("email") as string
    const password=formData.get("password") as string

    await auth.api.signInEmail({
        body:{
            email,
            password,
        }
    })
    redirect("/dashboard")
}

export async function signout(formData:FormData){
   await auth.api.signOut({
    headers:await headers()
   })
    redirect("/")
}
