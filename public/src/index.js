import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { AuthProvider } from "./contextAPI/useAuth"
// import { GlobalProvider } from "./contextAPI/useContext"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      {/* <GlobalProvider></GlobalProvider> */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
