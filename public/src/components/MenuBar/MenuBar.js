import React, { useEffect } from "react"
import styles from "./MenuBar.module.scss"
import { useHistory, Link } from "react-router-dom"
import { useGlobalContext } from "../../contextAPI/useContext"
import { RiDeleteBinLine, RiLogoutBoxLine } from "react-icons/ri"

function MenuBar() {
  const history = useHistory()
  const { setUser, isMenuBar, menuBarClose } = useGlobalContext()
  const top = `${86 - window.scrollY}px`
  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    history.push("/")
  }
  useEffect(() => {
    if (!isMenuBar) return
    window.addEventListener("scroll", menuBarClose)
    return () => window.removeEventListener("scroll", menuBarClose)
  }, [isMenuBar])

  return (
    <div
      className={
        isMenuBar ? `${styles.menuBar} ${styles.active}` : styles.menuBar
      }
      style={{ top }}
    >
      <button>
        <RiDeleteBinLine />
        <Link to="/cardnote/trash">
          <p>Recycle bin</p>
        </Link>
      </button>
      <button onClick={handleLogout}>
        <RiLogoutBoxLine />
        <p>Log out</p>
      </button>
    </div>
  )
}

export default MenuBar
