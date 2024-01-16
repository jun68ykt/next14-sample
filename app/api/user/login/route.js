// app/api/user/login/route.js

import { NextResponse } from "next/server"
import { SignJWT } from "jose";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { secretKey } from "@/middleware";

const getLoginToken = async (email) => {
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

            return NextResponse.json({ message: "ログイン失敗", detail: "パスワードが間違っています" }, { status: 401 })
        }
        return NextResponse.json({ message: "ログイン失敗", detail: "存在しないユーザーです。" }, { status: 404 })
    } catch (err) {
        return NextResponse.json({ message: "ログイン失敗", detail: err.message }, { status: 401 })
    }
}
