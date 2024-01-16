"use client"

import {useState} from "react";

const API_URL_BASE = "http://localhost:3000/api/"
const LOGIN_API_URL = `${API_URL_BASE}/user/login`

const INIT_USER = {name: "", email: ""}

const UserLogin = () => {
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
      const res = await fetch("http://localhost:3000/api/user/login", options)
      const resBody = await res.json()
      if (!res.ok)
        throw new Error(resBody.detail)

      // ログイン成功時
      localStorage.setItem("token", resBody.token)

      alert(`ログイン成功`)
    } catch(err) {
      alert(`ログイン失敗\n\n理由: ${err.message}`)
    }
  }

  const handleChange = ({ target: {name, value} }) => {
    setUser({...user, [name]: value})
  }

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" onChange={handleChange} placeholder="メールアドレス" required/>
        <input type="text" name="password" onChange={handleChange} placeholder="パスワード" required/>
        <button>ログイン</button>
      </form>
    </div>
  )
}

export default UserLogin
