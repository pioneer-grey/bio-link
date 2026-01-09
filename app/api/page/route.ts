import { NextRequest,NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import {page} from "@/db/schema"
import { eq } from "drizzle-orm";

export async function POST(req:NextRequest){
    try{
    const {userName}= await req.json()
     const session=await auth.api.getSession({
        headers:await headers()
    })
    const userId=session?.user.id as string
    const result=await db.select().from(page).where(eq(userName,page.userName))
    if(result.length>0){
        return NextResponse.json({
            message:"Username is taken"
        },{status:400})
    }
    await db.insert(page).values({
        userId:userId,
        userName:userName
    })

    return NextResponse.json({
        message:"Success"
    })
}
catch{
    return NextResponse.json({
        message:"Internal Server Error"
    },{status:500})
}
}