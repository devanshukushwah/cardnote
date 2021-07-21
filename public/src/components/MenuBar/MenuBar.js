import React, { useEffect } from "react"
import styles from "./MenuBar.module.scss"
import { useHistory, Link, useParams } from "react-router-dom"
import { useGlobalContext } from "../../contextAPI/useContext"
import { RiLogoutBoxFill } from "react-icons/ri"
import { FaTrash } from "react-icons/fa"
import { TiHome } from "react-icons/ti"

function MenuBar() {
  const history = useHistory()

  const { id } = useParams()
  const { dispatch, isMenuBar, menuBarClose } = useGlobalContext()
  const top = `${86 - window.scrollY}px`
  const handleLogout = () => {
    localStorage.clear()
    dispatch({ type: "SET_USER", payload: null })
    history.push("/")
  }
  useEffect(() => {
    if (!isMenuBar) return
    window.addEventListener("scroll", menuBarClose)
    return () => window.removeEventListener("scroll", menuBarClose)
  }, [isMenuBar])

  useEffect(() => {
    menuBarClose()
  }, [id])

  return (
    <div
      className={
        isMenuBar ? `${styles.menuBar} ${styles.active}` : styles.menuBar
      }
      style={{ top }}
    >
      <button>
        {id === "trash" ? (
          <>
            <TiHome />
            <Link to="/homepage">
              <p>Homepage</p>
            </Link>
          </>
        ) : (
          <>
            <FaTrash />
            <Link to="/trash">
              <p>Recycle bin</p>
            </Link>
          </>
        )}
      </button>
      <button onClick={handleLogout}>
        <RiLogoutBoxFill />
        <p>Log out</p>
      </button>
    </div>
  )
}

export default MenuBar
