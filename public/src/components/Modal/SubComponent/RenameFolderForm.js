import React from "react"
import { useGlobalContext } from "../../../contextAPI/useContext"
import CreateCancel from "./utls/CreateCancel"

function RenameFolderForm() {
  const { renameFolderFromServer } = useGlobalContext()
  const titleRef = React.useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    renameFolderFromServer(titleRef.current.value)
  }

  return (
    <div className="modal">
      <div className="header">
        <p>Rename Folder</p>
      </div>
      <div className="underline" />
      <div className="modal-container active">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="New title" ref={titleRef} autoFocus />
          <CreateCancel />
        </form>
      </div>
    </div>
  )
}

export default RenameFolderForm
