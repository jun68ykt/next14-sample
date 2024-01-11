// app/api/item/delete/[id]/route.js

import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function DELETE(_, context) {
    const { id } = context.params
    try {
        await connectDB()
        await ItemModel.deleteOne({ _id: id })
        return NextResponse.json({message: "アイテム削除成功"})
    } catch (err) {
        console.error(err)
        return NextResponse.json({message: "アイテム削除失敗"})
    }
}
