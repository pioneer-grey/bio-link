"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { SignoutAction } from '@/actions/auth'
import { getPage } from '@/actions/dashboard'
import Username from "@/components/dashboard/Username"

export default function page() {
  const { data, isLoading } = getPage()
  if (isLoading) {
    return (
      <h1>Loading....</h1>
    )
  }
  if (!data.success) {
    return (
      <>
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-sm">
            <Username />
          </div>
        </div>
      </>

    )
  }
  return (
    <>
      <div>Dashboard</div>
      <Button variant={"destructive"} onClick={SignoutAction} >Logout</Button>
    </>
  )
}

