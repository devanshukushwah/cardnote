import React, { useEffect } from "react"
import Container from "./components/Container/Container"
// import ContextMenu from "./components/ContextMenu/ContextMenu"
import DirectoryBar from "./components/DirectoryBar/DirectoryBar"
import MenuBar from "./components/MenuBar/MenuBar"
import Modal from "./components/Modal/Modal"
import TopHeader from "./components/TopHeader/TopHeader"
import { GlobalProvider } from "./contextAPI/useContext"

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
        <DirectoryBar />
        <Container />
        <MenuBar />
        <Modal />
      </GlobalProvider>
    </>
  )
}

export default Cardnote
