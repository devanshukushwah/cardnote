import React, { useEffect } from "react"
import { useGlobalContext } from "../../../contextAPI/useContext"
import CreateCancel from "../../CreateCancel/CreateCancel"
import styles from "./Form.module.scss"

function RenameFolderForm() {
  const { renameFolderFromServer, folders, contextMenuCordinate } = useGlobalContext()
  const titleRef = React.useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    renameFolderFromServer(titleRef.current.value)
  }
  useEffect(() => {
    const { id } = contextMenuCordinate
    const { title } = folders.find((item) => item._id === id)
    titleRef.current.value = title
    titleRef.current.select()
  }, [])

  return (
    <>
      <div className="header">
        <p>Rename Folder</p>
      </div>
      <div className="underline" />
      {/* <div className="modal-container active"> */}
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="New title" ref={titleRef} autoFocus onFocus={(e) => e.target.select()} />
        <CreateCancel confirm={"Edit"} />
      </form>
      {/* </div> */}
    </>
  )
}

export default RenameFolderForm
