import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { header, page } from "@/db/schema"
import { eq } from "drizzle-orm";

export async function PUT(req:NextRequest){
    try {   
            const session = await auth.api.getSession({
                headers: await headers()
            })
            if (!session?.user?.id) return NextResponse.error();
    
            const {name,bio,userName}=await req.json()
            if (!userName) return NextResponse.json({ error: "User not found" }, { status: 404 });
            await db
                .update(header)
                .set({ name:name,
                    bio:bio
                 })
                .where(eq(header.userName, userName));
    
            return NextResponse.json({ success: true,});
        }
        catch {
            return NextResponse.json({
                message: "Internal Server Error"
            }, { status: 500 })
        }
}