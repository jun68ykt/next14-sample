// app/api/user/login/route.js

import { NextResponse } from "next/server"

export async function GET() {
    return NextResponse.json({message: "ログイン成功"})
}
