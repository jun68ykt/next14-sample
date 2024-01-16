"use client"

import {useState} from "react";

const INIT_ITEM = {title: "", price: "", image: "", description: ""}

const ItemCreate = () => {
  const [item, setItem] = useState(INIT_ITEM)
  console.log("item", item)

  const handleChange = ({target: {name, value}}) => {
    setItem({...item, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      // TODO: アイテム登録APIをリクエスト
      console.log("アイテム登録APIをリクエスト")
    } catch (err) {

    }
  }

  return (
    <div>
      <h1>アイテム作成</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="アイテム名" onChange={handleChange} required/>
        <input type="text" name="price" placeholder="価格" onChange={handleChange} required/>
        <input type="text" name="image" placeholder="画像" onChange={handleChange} required/>
        <textarea name="description" rows={15} placeholder="商品説明" onChange={handleChange} required></textarea>
        <button>作成</button>
      </form>
    </div>
  )
}

export default ItemCreate
