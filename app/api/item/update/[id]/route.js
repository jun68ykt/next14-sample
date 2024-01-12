// app/api/item/update/[id]/route.js

import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function PUT(request, context) {
    const reqBody = await request.json()
    const { id } = context.params

    try {
        await connectDB()
        await ItemModel.updateOne({ _id: id }, reqBody)
        return NextResponse.json({message: "アイテム編集成功"})
    } catch (err) {
        console.error(err)
        return NextResponse.json({message: "アイテム編集失敗"})
    }
}
