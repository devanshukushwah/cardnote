import React, { useEffect, useState } from "react"
import "./DirectoryBar.scss"

function Box({ children }) {
  const [isScroll, setIsScroll] = useState(false)

  const forShadow = () => {
    const top = window.scrollY
    if (top > 80 && !isScroll) setIsScroll(true)
    if (top < 80) setIsScroll(false)
  }
  useEffect(() => {
    window.addEventListener("scroll", forShadow)
    return () => window.removeEventListener("scroll", forShadow)
  }, [])
  return (
    <>
      <main className={`DirectoryBar  ${isScroll && "scrollOn"}`}>
        {children}
      </main>
    </>
  )
}

export default Box
