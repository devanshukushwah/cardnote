import React, { useState, useEffect } from "react"
// import CardForm from "./SubComponent/CardForm"
import { FolderForm, CardForm } from "./SubComponent/Form"

function Modal() {
  const [type, setType] = useState("card")
  const handleSwitch = () => {
    type === "card" ? setType("folder") : setType("card")
  }
  useEffect(() => {
    setType("card")
    return () => setType("card")
  }, [])
  return (
    <>
      <div className="header">
        <p>{type}</p>
        <div className="switch-btn" onClick={handleSwitch}>
          <p className={type === "card" ? "pactive" : undefined}>Card</p>
          <p className={type === "folder" ? "pactive" : undefined}>Folder</p>
          <span className={type === "folder" ? "right" : "left"} />
        </div>
      </div>
      {
        {
          folder: <FolderForm />,
          card: <CardForm />,
        }[type]
      }
    </>
  )
}

export default Modal
