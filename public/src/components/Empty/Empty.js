import React from "react"
import { RiDeleteBin2Fill } from "react-icons/ri"
import styles from "./Empty.module.scss"

function Empty() {
  return (
    <main className={styles.main}>
      <div>
        <RiDeleteBin2Fill className={styles.icon} />
        <p>No item</p>
      </div>
    </main>
  )
}

export default Empty
