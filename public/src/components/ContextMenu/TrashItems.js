import React from "react"
import Button from "./Button"
import { MdRestore } from "react-icons/md"
import { FaTrash } from "react-icons/fa"
import { useGlobalContext } from "../../contextAPI/useContext"

function TrashItems() {
  const { dispatch } = useGlobalContext()
  return (
    <>
      <Button icon={<MdRestore />} p="Restore" onClick={() => dispatch({ type: "CONTEXT_RESTORE" })} />
      <Button icon={<FaTrash size={16} />} p="Delete" onClick={() => dispatch({ type: "CONTEXT_DELETE" })} />
    </>
  )
}

export default TrashItems
