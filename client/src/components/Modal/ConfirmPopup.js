import React from "react"
import { useGlobalContext } from "../../contextAPI/useContext"

function YesNoBtn({ fntn }) {
  const { handleCancel } = useGlobalContext()

  return (
    <div className="align">
      <div className="buttons">
        <button className="no" type="button" onClick={handleCancel}>
          No
        </button>
        <button className="yes" onClick={fntn}>
          Yes
        </button>
      </div>
    </div>
  )
}

function DeleteConfirm() {
  const { contextMenuCordinate, folders, cards, deleteOneFromServer } =
    useGlobalContext()
  const { type, id } = contextMenuCordinate
  let face = ""
  let back = ""
  if (type === "folder") {
    face = folders.find((item) => item._id === id).title
  }
  if (type === "card") {
    const data = cards.find((item) => item._id === id)
    face = data?.title
    back = data?.data
  }
  return (
    <>
      <p>
        Do you want to remove {type} "{face}"
      </p>
      <YesNoBtn fntn={() => deleteOneFromServer(id)} />
    </>
  )
}

function DeleteSelectAllConfirm() {
  const { clicked, deleteFromServer } = useGlobalContext()
  return (
    <>
      <p>You want to remove selected {clicked} Item</p>
      <YesNoBtn fntn={deleteFromServer} />
    </>
  )
}

function ConfirmPopup() {
  const { popType } = useGlobalContext()

  return (
    <div className="container">
      {
        {
          delete: <DeleteConfirm />,
          deleteSelectAllConfirm: <DeleteSelectAllConfirm />,
        }[popType]
      }
    </div>
  )
}

export default ConfirmPopup
