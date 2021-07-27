import React, { useState, useEffect, useRef } from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import CreateCancel from "../CreateCancel/CreateCancel"

function PdfPopup() {
  const { makePdf, dirPath } = useGlobalContext()
  const [checkBox, setCheckBox] = useState({ cards: true, folders: false })
  const titleRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    const title = titleRef.current.value
    makePdf(title)
  }

  const handleChange = (e) =>
    setCheckBox({ ...checkBox, [e.target.name]: e.target.checked })

  useEffect(() => {
    const name = dirPath[dirPath.length - 1].title
    titleRef.current.value = name
  }, [])

  return (
    <>
      <div className="header">Pdf</div>
      <div className="modal-container">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="Pdf Title" ref={titleRef} autoFocus />
          <div className="checkBox">
            <input
              type="checkbox"
              id="cards"
              name="cards"
              onChange={handleChange}
              checked={checkBox.cards}
            />
            <label htmlFor="cards">Cards</label>
          </div>
          <div className="checkBox">
            <input
              type="checkbox"
              id="folders"
              name="folders"
              onChange={handleChange}
              checked={checkBox.folders}
            />
            <label htmlFor="folders">Folders</label>
          </div>
          <CreateCancel />
        </form>
      </div>
    </>
  )
}

export default PdfPopup
