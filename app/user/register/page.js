const UserRegister = () => {

  const handleSubmit = () => {

  }

  return (
    <div>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="名前" required/>
        <input type="text" name="email" placeholder="メールアドレス" required/>
        <input type="text" name="password" placeholder="パスワード" required/>
        <button>登録</button>
      </form>
    </div>
  )
}

export default UserRegister
