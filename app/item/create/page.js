"use client"

import {useState} from "react";
import useAuth from "@/app/utils/useAuth";
import ImgInput from "@/app/components/imgInput";

const INIT_ITEM = {title: "", price: "", image: "", description: ""}

const ItemCreate = () => {
  const [item, setItem] = useState(INIT_ITEM)
  const { loginUserEmail } = useAuth()

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
        body: JSON.stringify({...item, email: loginUserEmail})
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, options)
      const resBody = await res.json()
      if (!res.ok)
        throw new Error(resBody.detail)

      alert(`アイテム作成成功`)
    } catch(err) {
      alert(`アイテム作成失敗\n\n理由: ${err.message}`)
    }
  }

  return (
    loginUserEmail && (
      <div>
        <h1 className="page-title">アイテム作成</h1>
        <ImgInput
          setImage={(image) => {
            setItem({...item, image})
          }}
        />
        <form onSubmit={handleSubmit}>
          <input value={item.title} type="text" name="title" placeholder="アイテム名" onChange={handleChange} required/>
          <input value={item.price} type="text" name="price" placeholder="価格" onChange={handleChange} required/>
          <input value={item.image} type="text" name="image" placeholder="画像" onChange={handleChange} required/>
          <textarea value={item.description} name="description" rows={15} placeholder="商品説明" onChange={handleChange} required></textarea>
          <button>作成</button>
        </form>
      </div>
    )
  )
}

export default ItemCreate
