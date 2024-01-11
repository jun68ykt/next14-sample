// middleware.js

import { NextResponse } from "next/server"

export async function middleware() {
    console.log("ミドルウェア")
    return NextResponse.next()
}
