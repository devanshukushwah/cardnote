import React, { useEffect, useRef } from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import "./ContextMenu.scss"
import HomeItems from "./HomeItems"
import TrashItems from "./TrashItems"
import { useParams } from "react-router-dom"

function ContextMenu() {
  const { id } = useParams()
  const { contextMenuCordinate, dispatch } = useGlobalContext()
  let { x, y } = contextMenuCordinate
  const contextMenuRef = useRef(null)
  const handleOutsideClick = () => dispatch({ type: "HANDLE_OUTSIDE_CLICK" })

  useEffect(() => {
    document.addEventListener("scroll", handleOutsideClick)
    return () => document.removeEventListener("scroll", handleOutsideClick)
  }, [])

  return (
    <>
      <div className="background" onClick={handleOutsideClick} />
      <main style={{ top: y, left: x }} ref={contextMenuRef} className="cardnote-contextMenu">
        {id === "trash" ? <TrashItems /> : <HomeItems />}
      </main>
    </>
  )
}

export default ContextMenu
