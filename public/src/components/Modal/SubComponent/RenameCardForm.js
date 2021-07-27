import React, { useEffect } from "react"
import { useGlobalContext } from "../../../contextAPI/useContext"
import CreateCancel from "../../CreateCancel/CreateCancel"

function RenameCardForm() {
  const { renameCardFromServer, contextMenuCordinate, cards } =
    useGlobalContext()
  const titleRef = React.useRef(null)
  const dataRef = React.useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    renameCardFromServer(titleRef.current.value, dataRef.current.value)
  }
  useEffect(() => {
    const { id } = contextMenuCordinate
    const { title, data } = cards.find((item) => item._id === id)
    titleRef.current.value = title
    dataRef.current.value = data
    titleRef.current.select()
  }, [])

  return (
    <div className="modal">
      <div className="header">
        <p>Rename Card</p>
      </div>
      <div className="underline" />
      <div className="modal-container active">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="New title"
            ref={titleRef}
            onFocus={(e) => e.target.select()}
            autoFocus
          />
          <input
            type="text"
            placeholder="New data"
            ref={dataRef}
            onFocus={(e) => e.target.select()}
          />
          <CreateCancel confirm={"Edit"} />
        </form>
      </div>
    </div>
  )
}

export default RenameCardForm
