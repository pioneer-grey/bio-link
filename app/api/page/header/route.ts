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
    
            const userId = session?.user.id as string
    
            const usernameResult = await db.select({ userName: page.userName }).from(page).where(eq(page.userId, userId))
            const {name,bio}=await req.json()
            if (!usernameResult[0]) return NextResponse.json({ error: "User not found" }, { status: 404 });
            const username = usernameResult[0].userName;
    
            await db
                .update(header)
                .set({ name:name,
                    bio:bio
                 })
                .where(eq(header.userName, username));
    
            return NextResponse.json({ success: true,});
        }
        catch {
            return NextResponse.json({
                message: "Internal Server Error"
            }, { status: 500 })
        }
}