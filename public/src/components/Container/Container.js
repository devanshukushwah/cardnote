import React, { useState } from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import ContextMenu from "../ContextMenu/ContextMenu"
import { useHistory } from "react-router-dom"
import ShowBar from "../ShowBar/ShowBar"
import SkeletonLoader from "../SkeletonLoader/SkeletonLoader"
import "./Container.scss"
import { FaFolder } from "react-icons/fa"
import { TiTick } from "react-icons/ti"
import Empty from "../Empty/Empty"

function Folders() {
  const { folders, isDelete, toggleSelectFolder, handleContextMenu } = useGlobalContext()
  const history = useHistory()
  const handleClick = (id) => (isDelete ? toggleSelectFolder(id) : history.push(`/${id}`))

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
              onClick={() => handleClick(_id)}
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

const SingleCard = ({ _id, title, data, clicked }) => {
  const { isDelete, isRestore, toggleSelectCard, handleContextMenu } = useGlobalContext()
  const [face, setFace] = useState(true)

  const handleClick = (id) => (isDelete || isRestore ? toggleSelectCard(id) : setFace(!face))
  return (
    <article key={_id} onClick={() => handleClick(_id)} onContextMenu={(e) => handleContextMenu(e, _id, "card")} className={clicked ? "selected" : undefined}>
      <p>{face ? title : data}</p>
      <TiTick className={clicked ? "tick-on" : "tick-off"} />
    </article>
  )
}

function Cards() {
  const { cards } = useGlobalContext()

  if (!cards.length) return <></>
  return (
    <section className="Cardnote-Cards col-card">
      {cards.map((item) => {
        return <SingleCard {...item} />
      })}
    </section>
  )
}

function Container() {
  const { contextMenuCordinate, isLoading, showBarCordinate, folders, cards } = useGlobalContext()
  return (
    <main className="Cardnote-container">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <Folders />
          <Cards />
          {!(folders.length + cards.length) && <Empty />}
          {contextMenuCordinate.show && <ContextMenu />}
          {/* {showBarCordinate.show && <ShowBar />} */}
        </>
      )}
    </main>
  )
}

export default Container
