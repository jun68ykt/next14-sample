// middleware.js

import { NextResponse } from "next/server"
import { jwtVerify } from "jose";

export const secretKey = new TextEncoder().encode(process.env.SECRET_KEY)

export async function middleware(request) {
    const auth = await request.headers.get("Authorization")
    const token = auth?.split(" ")[1]

    if (!token) {
        return NextResponse.json(
          { message: "トークンがありません", detail: `Authorizationヘッダ: ${auth}` },
          { status: 401 }
          )
    }
    try {
        const decodedJwt = await jwtVerify(token, secretKey)
        // console.log('トークン検証成功 decodedJwt:', decodedJwt)

        return NextResponse.next()
    } catch (err) {
        return NextResponse.json(
          { message: "トークンが正しくないので、ログインしてください。", detail: `${err}` },
          { status: 401 }
        )
    }
}

export const config = {
    matcher: [
        "/api/item/create",
        "/api/item/update/:path*",
        "/api/item/delete/:path*",
    ],
}
