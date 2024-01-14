"use client"
import { useState } from "react"

const UserRegister = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const options = {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password })
      }
      const res = await fetch("http://localhost:3000/api/user/register", options)
      const resBody = await res.json()
      if (!res.ok)
        throw new Error(resBody.detail)

      alert(`ユーザー登録成功`)
    } catch(err) {
      alert(`ユーザー登録失敗\n\n理由: ${err.message}`)
    }
  }

  const handleChange = ({ target }) => {
    const setter = { name: setName, email: setEmail, password: setPassword}[target.name]
    setter(target.value)
  }

  return (
    <div>
      <h1>ユーザー登録</h1>
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
