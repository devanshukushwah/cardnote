import React from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import ContextMenu from "../ContextMenu/ContextMenu"
import { useHistory } from "react-router-dom"
import ShowBar from "../ShowBar/ShowBar"
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader"
import "./Container.scss"
import { FaFolder } from "react-icons/fa"
import { TiTick } from "react-icons/ti"

function Folders() {
  const {
    folders,
    folderClicked,
    isDelete,
    toggleSelectFolder,
    handleContextMenu,
  } = useGlobalContext()
  const history = useHistory()
  const handleClick = (title, id) => {
    isDelete ? toggleSelectFolder(id) : folderClicked(title, id, history)
  }
  if (!folders.length) return <></>
  return (
    <>
      <section className="Cardnote-Folders col-folder">
        {folders.map((item) => {
          const { _id, title, clicked } = item
          return (
            <article
              className={clicked ? "selected" : undefined}
              key={_id}
              onClick={() => handleClick(title, _id)}
              onContextMenu={(e) => handleContextMenu(e, _id, "folder")}
            >
              <FaFolder className="icon" />
              <p>{title}</p>
              <TiTick className={clicked ? "tick-on" : "tick-off"} />
            </article>
          )
        })}
      </section>
    </>
  )
}

function Cards() {
  const { cards, setCards, isDelete, toggleSelectCard, handleContextMenu } =
    useGlobalContext()
  const handleClick = (id) => {
    if (!isDelete) return swapCard(id)
    toggleSelectCard(id)
  }

  const swapCard = (id) => {
    const newCard = cards.map((item) => {
      if (item._id === id) {
        const temp = item.title
        item.title = item.data
        item.data = temp
      }
      return item
    })
    setCards(newCard)
  }

  if (!cards.length) return <></>
  return (
    <section className="Cardnote-Cards col-card">
      {cards.map((item) => {
        const { _id, title, clicked } = item
        return (
          <article
            key={_id}
            onClick={() => handleClick(_id)}
            className={clicked ? "selected" : undefined}
            onContextMenu={(e) => handleContextMenu(e, _id, "card")}
          >
            <p>{title}</p>
            <TiTick className={clicked ? "tick-on" : "tick-off"} />
          </article>
        )
      })}
    </section>
  )
}

function Container() {
  const { contextMenuCordinate, isLoading, showBarCordinate } =
    useGlobalContext()

  return (
    <main className="Cardnote-container">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <Folders />
          <Cards />
          {contextMenuCordinate.show && <ContextMenu />}
          {showBarCordinate.show && <ShowBar />}
        </>
      )}
    </main>
  )
}

export default Container