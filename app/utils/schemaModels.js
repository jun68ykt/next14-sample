// app/utils/schemaModels.js

import mongoose, { Schema } from "mongoose"

const ItemSchema = new Schema({
    title: String,         
    image: String,
    price: String,      
    description: String,
    email: String,
})

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema)
