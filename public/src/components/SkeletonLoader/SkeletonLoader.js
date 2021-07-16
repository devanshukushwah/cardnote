import React from "react"
import { FaFolder } from "react-icons/fa"
import styles from "./SkeletonLoader.module.scss"

function SkeletonLoader() {
  let length = 4
  const width = window.innerWidth

  if (width < 600) length = 2
  else length = 4

  const folders = []
  const cards = []
  for (let i = 0; i < length; i++) {
    folders.push(
      <article key={i}>
        <FaFolder className="icon" />
        <div className={styles.p}>
          <span>
            <h1></h1>
          </span>
        </div>
      </article>
    )
  }
  for (let i = 0; i < length / (width < 900 ? 2 : 1); i++) {
    cards.push(
      <article key={i}>
        <div className={styles.p}>
          <span>
            <h1></h1>
          </span>
        </div>
      </article>
    )
  }

  return (
    <>
      <section className="Cardnote-Folders col-folder">{folders}</section>
      <section className="Cardnote-Cards col-card">{cards}</section>
    </>
  )
}

export default SkeletonLoader
