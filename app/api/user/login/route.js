// app/api/user/login/route.js

import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database";

export async function POST() {
    try {
        await connectDB()
        return NextResponse.json({ message: "ログイン成功" })
    } catch (err) {
        return NextResponse.json({ message: "ログイン失敗" })
    }
}
