import React, { useEffect, useRef } from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import "./ContextMenu.scss"
import { FiEdit3 } from "react-icons/fi"
import { RiDeleteBin5Line } from "react-icons/ri"

function ContextMenu() {
  const {
    contextMenuCordinate,
    setContextMenuCordinate,
    toggleSelectAll,
    handleRename,
    openModal,
    setPopType,
  } = useGlobalContext()
  let { x, y, type } = contextMenuCordinate
  const contextMenuRef = useRef(null)
  useEffect(() => {
    document.addEventListener("scroll", handleOutsideClick)
    return () => document.removeEventListener("scroll", handleOutsideClick)
  }, [])
  const handleOutsideClick = (e) => {
    setContextMenuCordinate({ ...contextMenuCordinate, show: false })
    toggleSelectAll(false)
  }

  const handleDelete = () => {
    setPopType("delete")
    openModal("confirmPopup")
  }

  return (
    <>
      <div className="background" onClick={handleOutsideClick} />
      <main
        style={{ top: y, left: x }}
        ref={contextMenuRef}
        className="cardnote-contextMenu"
      >
        <button onClick={() => handleRename(type)}>
          <FiEdit3 /> <p>Rename</p>
        </button>
        <button onClick={handleDelete}>
          <RiDeleteBin5Line /> <p>Delete</p>
        </button>
      </main>
    </>
  )
}

export default ContextMenu
