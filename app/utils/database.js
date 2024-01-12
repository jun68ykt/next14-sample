// app/utils/database.js

import mongoose from "mongoose"

const db = {
    name:  process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    params: "retryWrites=true&w=majority"
}
const dbConnectionUrl = `mongodb+srv://${db.user}:${db.password}@${db.host}/${db.name}?${db.params}`

const connectDB = async () => {
    console.log("データベースに接続中…")
    try {
        await mongoose.connect(dbConnectionUrl)
        console.log("OK")
    } catch(err) {
        console.log("NG")
        throw err
    }
}

export default connectDB
