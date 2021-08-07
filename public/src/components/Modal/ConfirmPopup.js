import React from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import CreateCancel from "../CreateCancel/CreateCancel"
// import CirculareLoader from "../CirculareLoader/CirculareLoader"

// function YesNoBtn({ fntn }) {
//   const { closeModal, isSubmitLoading } = useGlobalContext()

//   return (
//     <div className="align">
//       <div className="buttons">
//         <button className="no" type="button" onClick={closeModal}>
//           No
//         </button>
//         <button className="yes" onClick={fntn} disabled={isSubmitLoading}>
//           {isSubmitLoading ? <CirculareLoader /> : "Yes"}
//         </button>
//       </div>
//     </div>
//   )
// }

function DeleteConfirm({ type, face, id }) {
  const { deleteOneFromServer } = useGlobalContext()
  return (
    <>
      <div className="pCenter">
        <p>
          Paramanent delete {type} <i>"{face}"</i>&nbsp;
        </p>
        <p>?</p>
      </div>
      {/* <YesNoBtn fntn={() => deleteOneFromServer(id)} /> */}
      <CreateCancel handleFunction={() => deleteOneFromServer(id)} confirm="Delete" />
    </>
  )
}
function RemoveConfirm({ type, face, id }) {
  const { moveOneToTrash } = useGlobalContext()
  return (
    <>
      <div className="pCenter">
        <p>
          Remove {type} <i>"{face}"</i>&nbsp;
        </p>
        <p>?</p>
      </div>
      {/* <YesNoBtn fntn={() => moveOneToTrash(id)} /> */}
      <CreateCancel handleFunction={() => moveOneToTrash(id)} confirm="Remove" />
    </>
  )
}

function RestoreConfirm({ type, face, id }) {
  const { restoreOneFromTrash } = useGlobalContext()
  return (
    <>
      <div className="pCenter">
        <p>
          Restore {type} <i>"{face}"</i>&nbsp;
        </p>
        <p>?</p>
      </div>
      {/* <YesNoBtn fntn={() => restoreOneFromTrash(id)} /> */}
      <CreateCancel handleFunction={() => restoreOneFromTrash(id)} confirm="Restore" />
    </>
  )
}

function RestoreSelectAllConfirm() {
  const { clicked, restoreFromTrash } = useGlobalContext()
  return (
    <>
      <center>
        <p>Restore selected {clicked} Item&nbsp;?</p>
      </center>
      {/* <YesNoBtn fntn={restoreFromTrash} /> */}
      <CreateCancel handleFunction={restoreFromTrash} confirm="Restore" />
    </>
  )
}

function TrashSelectAllConfirm() {
  const { clicked, moveToTrash } = useGlobalContext()
  return (
    <>
      <center>
        <p>Remove selected {clicked} Item&nbsp;?</p>
      </center>
      {/* <YesNoBtn fntn={moveToTrash} /> */}
      <CreateCancel handleFunction={moveToTrash} confirm="Remove" />
    </>
  )
}

function DeleteSelectAllConfirm() {
  const { clicked, deleteFromTrash } = useGlobalContext()
  return (
    <>
      <center>
        <p>Parmanent delete selected {clicked} Item?</p>
      </center>
      {/* <YesNoBtn fntn={deleteFromTrash} /> */}
      <CreateCancel handleFunction={deleteFromTrash} confirm="Delete" />
    </>
  )
}

function ConfirmPopup() {
  const { popType, contextMenuCordinate, folders, cards } = useGlobalContext()
  const { type, id } = contextMenuCordinate
  let face = ""
  // let back = ""
  if (type === "folder") {
    face = folders.find((item) => item._id === id)?.title
  }
  if (type === "card") {
    face = cards.find((item) => item._id === id)?.title
    // back = data?.data
  }

  return (
    <div className="container">
      {
        {
          remove: <RemoveConfirm type={type} face={face} id={id} />,
          delete: <DeleteConfirm type={type} face={face} id={id} />,
          restore: <RestoreConfirm type={type} face={face} id={id} />,
          deleteSelectAllConfirm: <DeleteSelectAllConfirm />,
          restoreSelectAllConfirm: <RestoreSelectAllConfirm />,
          trashSelectAllConfirm: <TrashSelectAllConfirm />,
        }[popType]
      }
    </div>
  )
}

export default ConfirmPopup
