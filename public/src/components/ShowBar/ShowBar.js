import React, { useEffect, useRef } from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import { FolderForm, CardForm } from "../Modal/SubComponent/Form"

import styles from "./ShowBar.module.scss"

function ShowBar() {
  const { showBarCordinate } = useGlobalContext()
  const showBarRef = useRef(null)
  const { x, type } = showBarCordinate
  useEffect(() => {
    const barCordinate = showBarRef?.current
    if (!barCordinate) return
    barCordinate.style.right = `${x || 50}px`
  }, [showBarCordinate, x])

  return (
    <>
      <main
        className={showBarCordinate.show ? `${styles.cardnote_showbar_active} ${styles.cardnote_showbar}` : styles.cardnote_showbar}
        style={{ right: `${x || 50}px` }}
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
