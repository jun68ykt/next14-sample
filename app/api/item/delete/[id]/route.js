// app/api/item/delete/[id]/route.js

import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function DELETE(request, context) {
    try {
        const reqBody = await request.json()
        const { id } = context.params

        await connectDB()

        const item = await ItemModel.findById(id)
        if (!item) {
            return NextResponse.json(
                { message: "アイテム削除失敗", detail: "指定されたidのアイテムは存在しません" },
                { status: 404 }
            )
        }

        if (item.email === reqBody.email) {
            await ItemModel.deleteOne({ _id: id })
            return new Response(null, { status: 204 })
        } else {
            return NextResponse.json(
                { message: "アイテム削除失敗", detail: "他の人が作成したアイテムです。" },
                { status: 403 }
            )
        }
    } catch (err) {
        return NextResponse.json({ message: "アイテム削除失敗", detail: `${err}` }, { status: 500 })
    }
}
