import axios from "axios"
import { API_URL } from "../config/apiConfig"

const API = axios.create({ baseURL: API_URL })

API.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem("profile")).token
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export const getData = (props) => {
  const { setIsLoading, id, setFolders, setDirPath, setCards } = props
  setIsLoading(true)
  API.get(`/cardnote-api/${id}`)
    .then((res) => {
      const { folders, cards, directoryPath } = res.data
      if (cards) setCards(cards)
      if (folders) setFolders(folders)
      setDirPath(directoryPath)
      setIsLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setIsLoading(false)
    })
}

export const postFolder = (props) => {
  const { setIsSubmitLoading, fetchData, handleCancel, id, dirPath, title } =
    props

  if (!title) return
  setIsSubmitLoading(true)
  const data = {
    title,
    type: "folder",
    parent: id,
    directoryPath: dirPath,
  }
  API.post(`/cardnote-api/`, data)
    .then(() => {
      fetchData()
      handleCancel()
      setIsSubmitLoading(false)
    })
    .catch((err) => {
      setIsSubmitLoading(false)
      console.log(err.response.data)
    })
}

export const postCard = (props) => {
  const { setIsSubmitLoading, fetchData, handleCancel, id, title, data } = props

  if (!title || !data) return
  setIsSubmitLoading(true)

  const sendToServer = {
    title,
    data,
    type: "card",
    parent: id,
  }
  API.post(`/cardnote-api/`, sendToServer)
    .then(() => {
      fetchData()
      handleCancel()
      setIsSubmitLoading(false)
    })
    .catch((err) => {
      setIsSubmitLoading(false)
      console.log(err)
    })
}

export const reqDeleteOneFromServer = (props) => {
  const { idLocal, fetchData, handleCancel, closeContextMenu } = props
  API.put("/cardnote-api/trash", { itemlist: [idLocal] })
    .then(() => {
      fetchData()
      handleCancel()
      closeContextMenu()
    })
    .catch((err) => {
      console.log(err)
    })
}

export const reqDeleteFromServer = (props) => {
  const {
    folders,
    cards,
    setIsSubmitLoading,
    handleCancel,
    fetchData,
    deleteOff,
  } = props
  setIsSubmitLoading(true)
  const itemlist = []

  folders.map((item) => {
    if (item.clicked) itemlist.push(item._id)
    return item
  })
  cards.map((item) => {
    if (item.clicked) itemlist.push(item._id)
    return item
  })
  API.put("/cardnote-api/trash", { itemlist })
    .then(() => {
      deleteOff()
      handleCancel()
      fetchData()
      setIsSubmitLoading(false)
    })
    .catch((err) => {
      setIsSubmitLoading(false)
      console.log(err)
    })
}

export const reqRenameFolderFromServer = (props) => {
  const {
    contextMenuCordinate,
    newtitle,
    closeContextMenu,
    closeModal,
    fetchData,
  } = props
  const id = contextMenuCordinate.id
  const data = {
    id,
    newtitle,
  }
  API.put("/cardnote-api/folder", data).then(() => {
    closeContextMenu()
    closeModal()
    fetchData()
  })
}
export const reqRenameCardFromServer = (props) => {
  const {
    contextMenuCordinate,
    newtitle,
    newdata,
    closeContextMenu,
    closeModal,
    fetchData,
  } = props

  const id = contextMenuCordinate.id
  const data = {
    id,
    newtitle,
    newdata,
  }
  API.put("/cardnote-api/card", data).then(() => {
    closeContextMenu()
    closeModal()
    fetchData()
  })
}
