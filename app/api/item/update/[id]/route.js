// app/api/item/update/[id]/route.js

import { NextResponse } from "next/server"
import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";

export async function PUT(request, context) {
    const reqBody = await request.json()
    const { id } = context.params

    try {
        await connectDB()

        const item = await ItemModel.findById(id)
        if (!item) {
            return NextResponse.json(
                { message: "アイテム編集失敗", detail: "指定されたidのアイテムは存在しません" },
                { status: 404 }
            )
        }

        if (item.email === reqBody.email) {
            await ItemModel.updateOne({ _id: id }, reqBody)
            return new Response(null, { status: 204 })
        } else {
            return NextResponse.json(
                { message: "アイテム編集失敗", detail: "他の人が作成したアイテムです。" },
                { status: 403 }
            )
        }
    } catch (err) {
        return NextResponse.json({ message: "アイテム編集失敗", detail: `${err}` }, { status: 500 })
    }
}
