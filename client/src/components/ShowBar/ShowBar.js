import React, { useEffect, useRef } from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import { FolderForm, CardForm } from "../Modal/SubComponent/Form"

import "./ShowBar.scss"

function ShowBar() {
  const { showBarCordinate } = useGlobalContext()
  const showBarRef = useRef(null)
  const { x, y, type } = showBarCordinate
  useEffect(() => {
    const barCordinate = showBarRef?.current
    if (!barCordinate) return
    barCordinate.style.right = `${x}px`
    barCordinate.style.top = `${y + 37}px`
  }, [showBarCordinate])

  return (
    <>
      <main
        className="cardnote-showbar"
        style={{ top: `${y + 37}px`, right: `${x}px` }}
        ref={showBarRef}
      >
        {
          {
            folder: <FolderForm />,
            card: <CardForm />,
          }[type]
        }
      </main>
    </>
  )
}

export default ShowBar
