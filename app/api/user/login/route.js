// app/api/user/login/route.js

import { NextResponse } from "next/server"
import { SignJWT } from "jose";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";

const getLoginToken = async (email) => {
    const secretKey = new TextEncoder().encode("next-market-app-book")
    const payload = { email }
    return  await new SignJWT(payload)
        .setProtectedHeader({alg: "HS256"})
        .setExpirationTime("1d")
        .sign(secretKey)
}

export async function POST(request) {
    const { email, password } = await request.json()
    try {
        await connectDB()
        const user = await UserModel.findOne({ email })
        if (user) {
            if (password === user.password) {
                const token = await getLoginToken(email)
                return NextResponse.json({ message: "ログイン成功", token })
            }

            return NextResponse.json({ message: "ログイン失敗: パスワードが間違っています" })
        }
        return NextResponse.json({ message: "ログイン失敗: ユーザー登録をしてください"})
    } catch (err) {
        return NextResponse.json({ message: "ログイン失敗" })
    }
}
