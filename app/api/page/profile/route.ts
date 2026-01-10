import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db/db";
import { createClient } from "@supabase/supabase-js";
import { header, page } from "@/db/schema"
import { eq } from "drizzle-orm";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PUT(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) return NextResponse.error();

        const userId = session?.user.id as string

        const usernameResult = await db.select({ userName: page.userName }).from(page).where(eq(page.userId, userId))

        if (!usernameResult[0]) return NextResponse.json({ error: "User not found" }, { status: 404 });
        const username = usernameResult[0].userName;

        const formData = await req.formData()
        const avatar = formData.get("avatar") as File;
        const avatarFileName = `${Date.now()}-avatar.jpg`;

        const { error: avatarError } = await supabase.storage
            .from("profile")
            .upload(avatarFileName, avatar, {
                contentType: "image/jpeg",
            });

        if (avatarError) throw avatarError;

        const { data: avatarUrlData } = supabase.storage
            .from("profile")
            .getPublicUrl(avatarFileName);
        const avatarUrl = avatarUrlData.publicUrl;

        await db
            .update(header)
            .set({ picURL: avatarUrl })
            .where(eq(header.userName, username));

        return NextResponse.json({ success: true, URL: avatarUrl });
    }
    catch {
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 })
    }

}