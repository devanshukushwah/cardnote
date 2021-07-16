import React, { useContext, useState } from "react"
import axios from "axios"
import { API_URL } from "../config/apiConfig"

const Consumer = React.createContext()

export const AuthProvider = ({ children }) => {
  const [isSign, setIsSign] = useState(false)
  const [isMessage, setMessage] = useState(false)
  const [messageType, setMessageType] = useState("")

  const API = axios.create({ baseURL: API_URL })
  const messageOpen = (message) => {
    setMessageType(message)
    setMessage(true)
  }
  const messageClose = () => {
    setMessage(false)
  }

  const handleMessage = (message) => {
    messageOpen(message)
    setIsSign(false)
    setTimeout(() => {
      messageClose()
    }, 4000)
  }

  const handleSignIn = (formData, history, check) => {
    console.log("signin")
    setIsSign(true)
    API.post("/user/signin", formData)
      .then((res) => {
        const { result, token } = res.data
        localStorage.setItem("profile", JSON.stringify({ result, token }))
        if (!check) {
          window.addEventListener("unload", () => localStorage.clear())
        }
        setIsSign(false)
        history.push("/homepage")
      })
      .catch((err) => handleMessage(err?.response?.data?.message))
  }
  const handleSignUp = (formData, history) => {
    if (formData.password !== formData.confirmPassword) {
      handleMessage("password not match")
      return
    }
    setIsSign(true)
    API.post("/user/signup", formData)
      .then((res) => {
        const { result, token } = res.data

        localStorage.setItem("profile", JSON.stringify({ result, token }))

        setIsSign(false)
        history.push("/homepage")
      })
      .catch((err) => handleMessage(err?.response?.data?.message))
  }

  const handleResetPassword = (email, setIsTimer) => {
    setIsSign(true)
    API.post("/user/reset-password", { email })
      .then((res) => {
        handleMessage("mail is sended to your Email")
        setIsTimer(true)
      })
      .catch((err) => handleMessage(err?.response?.data?.message))
  }

  const handleNewPassword = (props) => {
    if (props.password !== props.confirmPassword)
      return handleMessage("password not match")
    setIsSign(true)
    API.post("/user/new-password", props)
      .then((res) => {
        handleMessage("password changed")
        setIsSign(false)
        props.history.push("/signin")
      })
      .catch((err) => handleMessage(err?.response?.data?.message))
  }

  const value = {
    handleSignUp,
    handleSignIn,
    handleResetPassword,
    handleNewPassword,
    messageOpen,
    messageClose,
    isSign,
    setIsSign,
    isMessage,
    messageType,
  }
  return <Consumer.Provider value={value}>{children}</Consumer.Provider>
}

export const useAuth = () => {
  return useContext(Consumer)
}
