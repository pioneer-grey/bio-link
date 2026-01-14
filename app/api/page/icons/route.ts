import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { social } from "@/db/schema";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { sql, eq } from "drizzle-orm";


type Icons = {
    userName: string,
    type: string,
    url?: string,
    order: number

}
export async function GET(req:NextRequest){
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) return NextResponse.error();

        const {userName}=await req.json()

        const result=await db.select().from(social).where(eq(social.userName,userName))
       
        return NextResponse.json({
            success:true,
            icons:result
        })

    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) return NextResponse.error();

        const { userName,icons } = await req.json()
    
        await db.transaction(async (tx) => {

            const [{ nextOrder }] = await tx.select({
                nextOrder: sql<number>`COALESCE(MAX(${social.order}),0)`,
            })
                .from(social)
                .where(eq(social.userName, userName))

            icons.forEach(async (s: string, index: number) => {
                await tx.insert(social).values({
                    userName,
                    type: s,
                    order: nextOrder + index + 1
                })
            })
        }
        )
        return NextResponse.json({
            success:true
        })

    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }
}