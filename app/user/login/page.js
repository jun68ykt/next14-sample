"use client"

const UserLogin = () => {
  return (
    <div>
      <h1>ログイン</h1>
      <form>
        <input type="text" name="email" placeholder="メールアドレス" required/>
        <input type="text" name="password" placeholder="パスワード" required/>
        <button>ログイン</button>
      </form>
    </div>
  )
}

export default UserLogin
