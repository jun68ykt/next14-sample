// app/api/user/login/route.js

import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

export async function POST(request) {
    const { email, password } = await request.json()
    try {
        await connectDB()
        const user = await UserModel.findOne({ email })
        if (user) {
            if (password === user.password)
                return NextResponse.json({ message: "ログイン成功" })

            return NextResponse.json({ message: "ログイン失敗: パスワードが間違っています" })
        }
        return NextResponse.json({ message: "ログイン失敗: ユーザー登録をしてください"})
    } catch (err) {
        return NextResponse.json({ message: "ログイン失敗" })
    }
}
