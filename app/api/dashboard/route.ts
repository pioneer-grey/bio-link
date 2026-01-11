import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { page, header } from "@/db/schema"
import { eq } from "drizzle-orm";



export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        const userId = session?.user.id as string
        const styleResult = await db.select({
            userName: page.userName,
            primaryTextColor: page.primaryTextColor,
            primaryBackground: page.primaryBackground,
            desktopBackgroundColor: page.desktopBackgroundColor,
            profilePictureShadow: page.profilePictureShadow,
            profilePictureBorder: page.profilePictureBorder,
            socialIconSize: page.socialIconSize,
            cardColor: page.cardColor,
            cardTextColor: page.cardTextColor,
            cardCorner: page.cardCorner,
            cardBorder: page.cardBorder,
            cardBorderColor: page.cardBorderColor,
            cardShadow: page.cardShadow,
            cardSpacing: page.cardSpacing
        }).from(page).where(eq(page.userId, userId))
        
        if (styleResult.length == 0) {
            return NextResponse.json({
                success: false
            })
        }
        const username = styleResult[0].userName
        const headerResult = await db.select().from(header).where(eq(header.userName, username))
        return NextResponse.json({
            success: true,
            styles: styleResult[0],
            header: headerResult[0]
        })
    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }

}