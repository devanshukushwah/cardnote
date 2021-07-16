import React from "react"
import { Redirect, Route } from "react-router-dom"

function PrivateRoute({ component: Component, ...rest }) {
  const currentUser = JSON.parse(localStorage.getItem("profile"))
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }}
    ></Route>
  )
}

export default PrivateRoute
