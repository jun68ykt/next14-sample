"use client"

import {useState} from "react";

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = ({target: {name, value}}) => {
    const setter = {email: setEmail, password: setPassword}[name]
    setter?.(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    try {
      // TODO: ログインAPIをリクエスト
    } catch (err) {
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
