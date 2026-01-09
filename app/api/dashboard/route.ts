import { NextRequest,NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import {page} from "@/db/schema"
import { eq } from "drizzle-orm";



export async function GET(){
    const session=await auth.api.getSession({
        headers:await headers()
    })
    const userId=session?.user.id as string
    const result=await db.select().from(page).where(eq(page.userId,userId))
    if(result.length==0){
        return NextResponse.json({
            success:false
        })
    }
    return NextResponse.json({
        success:true
    })
}