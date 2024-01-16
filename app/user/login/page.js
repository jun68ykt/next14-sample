"use client"

import {useState} from "react";

const API_URL_BASE = "http://localhost:3000/api/"
const LOGIN_API_URL = `${API_URL_BASE}/user/login`

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = ({target: {name, value}}) => {
    const setter = {email: setEmail, password: setPassword}[name]
    setter?.(value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const body = JSON.stringify({email, password})
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
      const resp = await fetch(LOGIN_API_URL, {method: "POST", headers, body})
      const data = await resp.json()
      if (!resp.ok)
        throw new Error(data.detail)

      alert(`ログイン成功`)
    } catch (err) {
      alert(`ログイン失敗 理由: ${err.message}`)
    }
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
