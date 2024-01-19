// utils/useAuth.js
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {jwtVerify} from "jose"

const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY)

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState(null)
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token")
      try {
        const decodedJWT = await jwtVerify(token, secretKey)
        setLoginUserEmail(decodedJWT.payload.email)
      } catch (error) {
        localStorage.removeItem("token")
        router.push("/user/login")
      }
    })()
  }, [router]);

  return {loginUserEmail}
}

export default useAuth
