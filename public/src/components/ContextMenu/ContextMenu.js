import React, { useEffect, useRef } from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import "./ContextMenu.scss"
// import { FaEdit } from "react-icons/fi"
import { RiDeleteBin5Fill, RiDeleteBin5Line } from "react-icons/ri"
import { MdRestore } from "react-icons/md"
import { useParams } from "react-router-dom"
import { FaTrash, FaEdit } from "react-icons/fa"

const Button = ({ icon, p, onClick }) => {
  return (
    <button onClick={onClick}>
      <div className="icon">{icon}</div>
      <p>{p}</p>
    </button>
  )
}

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
            <Button
              icon={<MdRestore />}
              p="Restore"
              onClick={() => dispatch({ type: "CONTEXT_RESTORE" })}
            />
            <Button
              icon={<FaTrash size={16} />}
              p="Delete"
              onClick={() => dispatch({ type: "CONTEXT_DELETE" })}
            />
          </>
        ) : (
          <>
            <Button
              icon={<FaEdit />}
              p="Rename"
              onClick={() =>
                dispatch({ type: "CONTEXT_RENAME", payload: type })
              }
            />
            <Button
              icon={<FaTrash size={16} />}
              p="Remove"
              onClick={() => dispatch({ type: "CONTEXT_REMOVE" })}
            />
          </>
        )}
      </main>
    </>
  )
}

export default ContextMenu
