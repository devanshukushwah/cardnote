import React from "react"
import { useGlobalContext } from "../../contextAPI/useContext"

function SelectedItem({ children }) {
  const { isRestore, isDelete, clicked } = useGlobalContext()
  if (isRestore || isDelete)
    return <p className="clickedItem">{clicked} Item</p>
  return <>{children}</>
}

export default SelectedItem
