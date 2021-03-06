import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useGlobalContext } from "../../contextAPI/useContext"
import { ReactComponent as Logo } from "../../images/logo.svg"
import MenuBar from "../MenuBar/MenuBar"
import "./TopHeader.scss"

function TopHeader() {
  const { isMenuBar, toggleMenuBar } = useGlobalContext()
  const location = useLocation()
  let user = JSON.parse(localStorage.profile) || null
  useEffect(() => {
    // const token = user?.token
    user = JSON.parse(localStorage.profile) || null
    // dispatch({
    //   Type: "SET_USER",
    //   payload: JSON.parse(localStorage.getItem("profile")),
    // })
  }, [location])

  return (
    <>
      <header className="cardNote">
        <div className="icon">
          <Logo />
        </div>
        {user && (
          <div className="my-account" onClick={toggleMenuBar}>
            {user.result.imageUrl ? (
              <img className="photo" src={user.result.imageUrl} alt={user.result.name} />
            ) : (
              <div className="not-photo">
                <p>{user.result.name.charAt(0) || "M"}</p>
              </div>
            )}
            <div className={!isMenuBar ? "active focus" : "active"}></div>
          </div>
        )}
        <MenuBar />
      </header>
    </>
  )
}

export default TopHeader
