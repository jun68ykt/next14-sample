// app/api/item/readall/route.js

import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET() {
    try {
        await connectDB()
        const items = await ItemModel.find()
        return NextResponse.json({ message: "👍アイテム読み取り成功（オール）", size: items.length, items })
    } catch(err) {
        return NextResponse.json({ message: "🙅アイテム読み取り失敗（オール）" })
    }
}

export const revalidate = 0
