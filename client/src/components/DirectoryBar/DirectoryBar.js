import React, { useEffect, useRef } from "react"
import "./DirectoryBar.scss"
import { GoChevronRight } from "react-icons/go"
import { ReactComponent as AddFolder } from "../../images/icons/addFolder.svg"
import { ReactComponent as AddCard } from "../../images/icons/addCard.svg"
import { useGlobalContext } from "../../contextAPI/useContext"
import { BiSelection } from "react-icons/bi"
import { IoMdDoneAll } from "react-icons/io"
import { FaTrash } from "react-icons/fa"
import { MdPictureAsPdf } from "react-icons/md"
import Box from "./Box"
import { useHistory } from "react-router-dom"

function DirectoryBar() {
  const {
    dirPath,
    dirClicked,
    openModal,
    isDelete,
    deleteOff,
    toggleDeleteOnOff,
    setPopType,
    toggleSelectAll,
    setShowBarCordinate,
    folders,
    cards,
    clicked,
    setClicked,
    showBarCordinate,
  } = useGlobalContext()

  const folderRef = useRef(null)
  const cardRef = useRef(null)
  const history = useHistory()

  const handleClick = (index, page) => {
    if (index === dirPath.length - 1) return
    dirClicked(index, page, history)
  }
  const handleDelete = () => {
    if (!isDelete) return openModal()
    deleteOff()
  }

  const handleFullClick = (type) => {
    let x, y
    if (type === "folder") {
      x = window.innerWidth - folderRef.current.getBoundingClientRect().right
      y = folderRef.current.getBoundingClientRect().top
    } else if (type === "card") {
      x = window.innerWidth - cardRef.current.getBoundingClientRect().right
      y = cardRef.current.getBoundingClientRect().top
    }
    const data = {
      x,
      y,
      type,
      show: true,
    }
    setShowBarCordinate(data)
  }

  const handleDone = () => {
    if (!clicked) return
    setPopType("deleteSelectAllConfirm")
    openModal("confirmPopup")
  }

  useEffect(() => {
    const clickedFolders = folders.filter((item) => item.clicked === true)
    const clickedCards = cards.filter((item) => item.clicked === true)
    setClicked(clickedFolders.length + clickedCards.length)
  }, [folders, cards])

  return (
    <>
      <Box>
        {isDelete ? (
          <p className="clickedItem">{clicked} Item</p>
        ) : (
          <section className="address">
            {dirPath.map((item, index) => {
              const { page, title } = item
              const len = dirPath.length
              return (
                <article key={index}>
                  <p
                    className={index === len - 1 && len !== 1 && "lastOne"}
                    onClick={() => handleClick(index, page)}
                  >
                    {title}
                  </p>
                  {len !== 1 && index !== len - 1 && <GoChevronRight />}
                </article>
              )
            })}
          </section>
        )}

        <section className="buttons">
          <div className="leftBtns">
            <button
              onClick={() => toggleSelectAll(true)}
              className={isDelete ? "active" : "not-active"}
            >
              <BiSelection className="icon" size={22} />
              <p>Select All</p>
            </button>
            <button
              onClick={handleDone}
              className={isDelete ? "active" : "not-active"}
            >
              <IoMdDoneAll className="icon" size={22} />
              <p>Done</p>
            </button>
            <button
              onClick={() => openModal("pdfPopup")}
              className={!isDelete ? "active" : "not-active"}
            >
              <MdPictureAsPdf className="icon" size={22} />
              <p>Pdf</p>
            </button>
            <button
              onClick={toggleDeleteOnOff}
              className={isDelete ? "btn-active" : undefined}
            >
              <FaTrash
                className={isDelete ? "icon-active" : "icon"}
                size={16}
              />
              <p>Delete</p>
            </button>
          </div>
          <div className="fullBtns">
            <button
              onClick={() => handleFullClick("card")}
              ref={cardRef}
              className={
                showBarCordinate.type === "card" ? "btn-active" : undefined
              }
            >
              <AddCard
                className={
                  showBarCordinate.type === "card" ? "icon-active" : "icon"
                }
              />
              <p>Card</p>
            </button>
            <button
              onClick={() => handleFullClick("folder")}
              ref={folderRef}
              className={
                showBarCordinate.type === "folder" ? "btn-active" : undefined
              }
            >
              <AddFolder
                className={
                  showBarCordinate.type === "folder" ? "icon-active" : "icon"
                }
              />
              <p>Folder</p>
            </button>
          </div>
          <div className="halfBtns">
            <button className="xross" onClick={handleDelete}>
              <p className={isDelete ? "active" : undefined}>&times;</p>
            </button>
          </div>
        </section>
      </Box>
    </>
  )
}

export default DirectoryBar
