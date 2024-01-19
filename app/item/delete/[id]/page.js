"use client"

import {useEffect, useState} from "react";
import Image from "next/image"
import useAuth from "@/app/utils/useAuth";

const INIT_ITEM = {title: "", price: "", image: "", description: "", email: ""}

const ItemDelete = (context) => {
  const [item, setItem] = useState(INIT_ITEM)
  const { loginUserEmail } = useAuth()

  const handleChange = ({target: {name, value}}) => {
    setItem({...item, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const options = {
        method: 'DELETE',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({email: item.email})
      }
      const url = `${process.env.NEXT_PUBLIC_URL}/api/item/delete/${context.params.id}`
      const res = await fetch(url, options)
      if (!res.ok) {
        const resBody = await res.json()
        throw new Error(resBody.detail)
      }

      alert(`アイテム削除成功`)
    } catch (err) {
      alert(`アイテム削除失敗\n\n理由: ${err.message}`)
    }
  }

  useEffect(() => {
    (async (id) => {
      const url = `${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`
      const resp = await fetch(url, {cache: "no-store"})
      const {item: {title, price, image, description, email}} = await resp.json()
      setItem({title, price, image, description, email})
    })(context.params.id)
  }, [context]);

  return (
    <div>
      <h1 className="page-title">アイテム削除</h1>
      {item.email === loginUserEmail ? (
        <form onSubmit={handleSubmit}>
          <h2>{item.title}</h2>
          {item.image &&
            <Image src={item.image} width={750} height={500} alt="item-image" priority/>
          }
          <h3>¥{item.price}</h3>
          <p>{item.description}</p>
          <button>削除</button>
        </form>
      ) : (
        <div>
          <h1>権限がありません</h1>
        </div>
      )}
    </div>
  )
}

export default ItemDelete
