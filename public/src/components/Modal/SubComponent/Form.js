import React, { useRef } from "react"
import { useGlobalContext } from "../../../contextAPI/useContext"
import styles from "./Form.module.scss"
import CreateCancel from "../../CreateCancel/CreateCancel"

export const FolderForm = () => {
  const { addFolder } = useGlobalContext()
  const titleRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const title = titleRef.current.value
    addFolder(title)
  }

  return (
    // <div className="modal-container">
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <input type="text" placeholder="Title" maxLength={30} ref={titleRef} required="true" autoFocus />
      <CreateCancel confirm="Add" />
    </form>
    // </div>
  )
}

export const CardForm = () => {
  const { addCard } = useGlobalContext()
  const titleRef = useRef(null)
  const dataRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const title = titleRef.current.value
    const data = dataRef.current.value
    addCard(title, data)
  }

  return (
    // <div className="modal-container">
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <input type="text" placeholder="Front" ref={titleRef} required="true" autoFocus />
      <input type="text" placeholder="Back" ref={dataRef} required="true" />
      <CreateCancel confirm="Add" />
    </form>
    // </div>
  )
}
