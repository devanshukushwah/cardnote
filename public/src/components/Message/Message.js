import React, { useEffect } from "react"
import { useAuth } from "../../contextAPI/useAuth"
import styles from "./Message.module.scss"
import { SiGooglemessages } from "react-icons/si"

function Message() {
  const { isMessage, messageType } = useAuth()

  return (
    <main
      className={
        isMessage
          ? `${styles.main} ${styles.slideIn}`
          : `${styles.main} ${styles.slideOut}`
      }
    >
      <SiGooglemessages size={22} fill="#8cc63f" />
      <p>{messageType || "No message open by mistake"}</p>
    </main>
  )
}

export default Message
