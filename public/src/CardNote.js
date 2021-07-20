import React, { useEffect } from "react"
import Container from "./components/Container/Container"
// import DirectoryBar from "./components/Bar/DirectoryBar"
import MenuBar from "./components/MenuBar/MenuBar"
import Modal from "./components/Modal/Modal"
import TopHeader from "./components/TopHeader/TopHeader"
import { GlobalProvider } from "./contextAPI/useContext"
import Bar from "./components/Bar/Bar"

function Cardnote() {
  useEffect(() => {
    document.body.style.backgroundColor = "#F9F6F7"
    return () => {
      document.body.style.backgroundColor = "none"
    }
  }, [])

  return (
    <>
      <GlobalProvider>
        <TopHeader />
        <Bar />
        <Container />
        <MenuBar />
        <Modal />
      </GlobalProvider>
    </>
  )
}

export default Cardnote
