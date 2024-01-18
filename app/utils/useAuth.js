// utils/useAuth.js
import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {jwtVerify} from "jose"
import {secretKey} from "@/middleware"

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/user/login")
        return
      }
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
