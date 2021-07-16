import React, { useEffect } from "react"
import Container from "./components/Container/Container"
// import ContextMenu from "./components/ContextMenu/ContextMenu"
import DirectoryBar from "./components/DirectoryBar/DirectoryBar"
// import Modal from "./components/Modal/Modal"
// import ShowBar from "./components/ShowBar/ShowBar"
import TopHeader from "./components/TopHeader/TopHeader"
import { GlobalProvider } from "./contextAPI/useContext"

function CardNoteTrash() {
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
      </GlobalProvider>
    </>
  )
}

export default CardNoteTrash
