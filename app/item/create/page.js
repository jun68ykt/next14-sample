"use client"

import {useState} from "react";

const INIT_ITEM = {title: "", price: "", image: "", description: ""}

const ItemCreate = () => {
  const [item, setItem] = useState(INIT_ITEM)

  const handleChange = ({target: {name, value}}) => {
    setItem({...item, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const options = {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({...item, email: "dummy-email@xxx.yyy"})  // TODO: 後でログインユーザーのメアドに置き換え
      }
      const res = await fetch("http://localhost:3000/api/item/create", options)
      const resBody = await res.json()
      if (!res.ok)
        throw new Error(resBody.detail)

      alert(`アイテム作成成功`)
    } catch(err) {
      alert(`アイテム作成失敗\n\n理由: ${err.message}`)
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
