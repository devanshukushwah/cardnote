import React, { useEffect, useRef } from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import "./ContextMenu.scss"
import { FiEdit3 } from "react-icons/fi"
import { RiDeleteBin5Line } from "react-icons/ri"
import { MdRestore } from "react-icons/md"
import { useParams } from "react-router-dom"

function ContextMenu() {
  const { id } = useParams()
  const { contextMenuCordinate, dispatch } = useGlobalContext()
  let { x, y, type } = contextMenuCordinate
  const contextMenuRef = useRef(null)
  const handleOutsideClick = () => dispatch({ type: "HANDLE_OUTSIDE_CLICK" })

  useEffect(() => {
    document.addEventListener("scroll", handleOutsideClick)
    return () => document.removeEventListener("scroll", handleOutsideClick)
  }, [])

  return (
    <>
      <div className="background" onClick={handleOutsideClick} />
      <main
        style={{ top: y, left: x }}
        ref={contextMenuRef}
        className="cardnote-contextMenu"
      >
        {id === "trash" ? (
          <>
            <button onClick={() => dispatch({ type: "CONTEXT_RESTORE" })}>
              <MdRestore /> <p>Restore</p>
            </button>
            <button onClick={() => dispatch({ type: "CONTEXT_DELETE" })}>
              <RiDeleteBin5Line /> <p>Delete</p>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() =>
                dispatch({ type: "CONTEXT_RENAME", payload: type })
              }
            >
              <FiEdit3 /> <p>Rename</p>
            </button>
            <button onClick={() => dispatch({ type: "CONTEXT_REMOVE" })}>
              <RiDeleteBin5Line /> <p>Remove</p>
            </button>
          </>
        )}
      </main>
    </>
  )
}

export default ContextMenu
