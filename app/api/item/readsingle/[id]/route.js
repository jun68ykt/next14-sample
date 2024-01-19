// app/api/item/readsingle/[id]/route.js

import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database"
import { ItemModel } from "@/app/utils/schemaModels";

export async function GET(request, context) {
    const { id } = context.params
    try {
        await connectDB()
        const item = await ItemModel.findById(id);
        return NextResponse.json({ message: "アイテム読み取り成功（シングル）", item })
    } catch(err) {
        return NextResponse.json({ message: "アイテム読み取り失敗（シングル）" })
    }
}
