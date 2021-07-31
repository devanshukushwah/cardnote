import React, { useEffect, useState } from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import ShowBar from "../ShowBar/ShowBar"
import "./DirectoryBar.scss"

function Box({ children }) {
  const { dispatch, showBarCordinate } = useGlobalContext()
  const [isScroll, setIsScroll] = useState(false)

  const forShadow = () => {
    const top = window.scrollY
    if (top > 80 && !isScroll) setIsScroll(true)
    if (top < 80) {
      setIsScroll(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", forShadow)
    return () => window.removeEventListener("scroll", forShadow)
  }, [])
  return (
    <>
      <main className={`DirectoryBar  ${isScroll ? "scrollOn" : undefined}`}>
        {children}
        <ShowBar />
      </main>
    </>
  )
}

export default Box
