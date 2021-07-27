import React, { useEffect } from "react"
import styles from "./MenuBar.module.scss"
import { useHistory, Link, useParams } from "react-router-dom"
import { useGlobalContext } from "../../contextAPI/useContext"
import { RiLogoutBoxFill } from "react-icons/ri"
import { FaTrash } from "react-icons/fa"
import { TiHome } from "react-icons/ti"

const IconLabel = ({ icon, p, to }) => {
  return (
    <>
      <div className={styles.icon}>{icon}</div>
      {to ? (
        <Link to={to}>
          <p>{p}</p>
        </Link>
      ) : (
        <p>{p}</p>
      )}
    </>
  )
}

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
          <IconLabel to="/homepage" p="Homepage" icon={<TiHome />} />
        ) : (
          <IconLabel to="/trash" p="Recycle bin" icon={<FaTrash size={16} />} />
        )}
      </button>
      <button onClick={handleLogout}>
        <IconLabel p="Log out" icon={<RiLogoutBoxFill />} />
      </button>
    </div>
  )
}

export default MenuBar
