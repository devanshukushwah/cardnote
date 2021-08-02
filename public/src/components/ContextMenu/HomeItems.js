import React from "react"
import Button from "./Button"
import { FaTrash, FaEdit } from "react-icons/fa"
import { BiMoveVertical } from "react-icons/bi"
import { useGlobalContext } from "../../contextAPI/useContext"

function HomeItems() {
  const { contextMenuCordinate, dispatch } = useGlobalContext()
  const { type } = contextMenuCordinate
  return (
    <>
      <Button icon={<FaEdit />} p="Rename" onClick={() => dispatch({ type: "CONTEXT_RENAME", payload: type })} />
      <Button icon={<FaTrash size={16} />} p="Remove" onClick={() => dispatch({ type: "CONTEXT_REMOVE" })} />
      <Button icon={<BiMoveVertical size={20} />} p="Align Card" onClick={() => dispatch({ type: "CONTEXT_ALIGN_CARD" })} />
    </>
  )
}

export default HomeItems
