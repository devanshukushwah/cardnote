import React from "react"

const Button = ({ icon, p, onClick }) => {
  return (
    <button onClick={onClick}>
      <div className="icon">{icon}</div>
      <p>{p}</p>
    </button>
  )
}

export default Button
