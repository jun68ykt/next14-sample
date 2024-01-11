// app/api/item/create/route.js

import { NextResponse } from "next/server"
import connectDB from "../../../utils/database"

export async function POST(request) {
    const body = await request.json()
    console.log(body)
    connectDB()
    return NextResponse.json({message: "アイテム作成"})
}
