import React from "react"
import "./css/HomePage.scss"
import { Sign } from "./components/SignForms/Sign"
import { Link, useHistory } from "react-router-dom"
import { ReactComponent as Logo } from "./images/logo.svg"
import { ReactComponent as Wave } from "./images/bgWave.svg"
import { ReactComponent as LaptopGuy } from "./images/laptopGuy.svg"

function HomePage() {
  const history = useHistory()

  const have = JSON.parse(localStorage.getItem("profile"))
  if (have) history.push("/homepage")
  return (
    <main className="cardnote-homepage-1">
      <Wave className="cardnote-wave" />
      <div className="header">
        <Logo className="logo" />
        <div className="buttons">
          <Link to="/signin" className="signin">
            Sign In
          </Link>
          <Link to="/signup" className="signup">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="left">
          <p>OPTIMIZE</p>
          <p>YOUR NOTE MAKING</p>
        </div>
        <div className="right">
          <LaptopGuy className="guy" />
        </div>
      </div>
    </main>
  )
}

export default HomePage
