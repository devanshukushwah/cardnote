import React from "react"
import { useGlobalContext } from "../../../contextAPI/useContext"
import CreateCancel from "./utls/CreateCancel"

function RenameCardForm() {
  const { renameCardFromServer } = useGlobalContext()
  const titleRef = React.useRef(null)
  const dataRef = React.useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    renameCardFromServer(titleRef.current.value, dataRef.current.value)
  }

  return (
    <div className="modal">
      <div className="header">
        <p>Rename Card</p>
      </div>
      <div className="underline" />
      <div className="modal-container active">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="New title" ref={titleRef} autoFocus />
          <input type="text" placeholder="New data" ref={dataRef} />
          <CreateCancel />
        </form>
      </div>
    </div>
  )
}

export default RenameCardForm
