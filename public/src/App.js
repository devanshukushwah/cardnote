import React from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import "./App.css"
import CardNote from "./CardNote"
import HomePage from "./HomePage"
import PrivateRoute from "./utils/PrivateRoute"
import { Sign, ForgetPassword, NewPassword } from "./components/SignForms/Sign"

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path={["/signin", "/signup"]}>
            <Sign />
            <HomePage />
          </Route>
          <Route exact path="/reset">
            <ForgetPassword />
            <HomePage />
          </Route>
          <Route exact path="/reset/:token">
            <NewPassword />
            <HomePage />
          </Route>
          <PrivateRoute exact path="/:id" component={CardNote} />
          <Route path="*">
            <h1>page not found</h1>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
