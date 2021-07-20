import React from "react"
import { useParams } from "react-router-dom"
import TrashBar from "./TrashBar"
import DirectoryBar from "./DirectoryBar"

function Bar() {
  const { id } = useParams()
  if (id === "trash") return <TrashBar />
  return <DirectoryBar />
}

export default Bar
