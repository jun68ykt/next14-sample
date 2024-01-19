"use client"
import { useState } from "react"

const INIT_USER = {name: "", email: "", password: ""}

const UserRegister = () => {

  const [user, setUser] = useState(INIT_USER)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const options = {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/register`, options)
      const resBody = await res.json()
      if (!res.ok)
        throw new Error(resBody.detail)

      alert(`ユーザー登録成功`)
    } catch(err) {
      alert(`ユーザー登録失敗\n\n理由: ${err.message}`)
    }
  }

  const handleChange = ({ target: {name, value} }) => {
    setUser({...user, [name]: value})
  }

  return (
    <div>
      <h1 className="page-title">ユーザー登録</h1>
      <form onSubmit={handleSubmit} method="post">
        <input type="text" name="name" onChange={handleChange} placeholder="名前" required/>
        <input type="text" name="email" onChange={handleChange} placeholder="メールアドレス" required/>
        <input type="text" name="password" onChange={handleChange} placeholder="パスワード" required/>
        <button>登録</button>
      </form>
    </div>
  )
}

export default UserRegister
