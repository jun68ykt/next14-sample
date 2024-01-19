"use client"

import {useEffect, useState} from "react";
import useAuth from "@/app/utils/useAuth";

const INIT_ITEM = {title: "", price: "", image: "", description: "", email: ""}

const ItemUpdate = (context) => {
  const [item, setItem] = useState(INIT_ITEM)
  const { loginUserEmail } = useAuth()

  const handleChange = ({target: {name, value}}) => {
    setItem({...item, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const options = {
        method: 'PUT',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(item)
      }
      const url = `http://localhost:3000/api/item/update/${context.params.id}`
      const res = await fetch(url, options)
      if (!res.ok) {
        const resBody = await res.json()
        throw new Error(resBody.detail)
      }

      alert(`アイテム編集成功`)
    } catch (err) {
      alert(`アイテム編集失敗\n\n理由: ${err.message}`)
    }
  }

  useEffect(() => {
    (async (id) => {
      const url = `http://localhost:3000/api/item/readsingle/${id}`
      const resp = await fetch(url, {cache: "no-store"})
      const {item: {title, price, image, description, email}} = await resp.json()
      setItem({title, price, image, description, email})
    })(context.params.id)
  }, [context]);

  return (
    <div>
      <h1 className="page-title">アイテム編集</h1>
      {item.email === loginUserEmail ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={item.title} placeholder="アイテム名" onChange={handleChange} required/>
          <input type="text" name="price" value={item.price} placeholder="価格" onChange={handleChange} required/>
          <input type="text" name="image" value={item.image} placeholder="画像" onChange={handleChange} required/>
          <textarea
            name="description"
            value={item.description}
            rows={15}
            placeholder="商品説明"
            onChange={handleChange}
            required
          />
          <button>編集</button>
        </form>
      ) : (
        <div>
          <h1>権限がありません</h1>
        </div>
      )}
    </div>
  )
}

export default ItemUpdate
