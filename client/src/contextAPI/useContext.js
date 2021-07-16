import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { jsPDF } from "jspdf"

// API
import {
  getData,
  postFolder,
  postCard,
  reqDeleteOneFromServer,
  reqRenameFolderFromServer,
  reqRenameCardFromServer,
  reqDeleteFromServer,
} from "../api/index"

const Consumer = React.createContext()

export const GlobalProvider = ({ children }) => {
  const { id } = useParams()
  const [dirPath, setDirPath] = useState([
    { title: "Homepage", page: "homepage" },
  ])
  const [folders, setFolders] = useState([])
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [modalType, setModalType] = React.useState("card")
  const [isDelete, setIsDelete] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [popType, setPopType] = useState("delete")
  const [showBarCordinate, setShowBarCordinate] = useState({
    x: "980.503",
    y: "128.336",
    type: "nothing",
    show: false,
  })
  const [contextMenuCordinate, setContextMenuCordinate] = useState({
    x: "0",
    y: "0",
    id: null,
    show: false,
    type: "folder",
  })
  const [clicked, setClicked] = useState(0)
  const [isMenuBar, setIsMenuBar] = useState(false)

  // console.log(id, folders, cards)

  useEffect(() => {
    fetchData()
  }, [id])

  const menuBarOpen = () => {
    setIsMenuBar(true)
  }
  const menuBarClose = () => {
    setIsMenuBar(false)
  }
  const toggleMenuBar = () => {
    setIsMenuBar(!isMenuBar)
  }

  const closeContextMenu = () => {
    setContextMenuCordinate({ ...contextMenuCordinate, show: false })
  }

  const deleteOn = () => {
    setIsDelete(true)
  }
  const deleteOff = () => {
    setIsDelete(false)
  }

  const handleCancel = () => {
    closeModal()
    setShowBarCordinate({ show: false })
    closeContextMenu()
    toggleSelectAll(false)
  }

  const toggleDeleteOnOff = () => {
    if (folders.length + cards.length || isLoading) setIsDelete(!isDelete)
  }

  const openModal = (type = null) => {
    setIsModal(true)
    setModalType(type)
  }
  const closeModal = () => {
    setModalType("card")
    setIsModal(false)
  }

  // API CALLS
  const fetchData = () => getData(apiFunction)
  const addFolder = (title) => postFolder({ ...apiFunction, title })
  const addCard = (title, data) => postCard({ ...apiFunction, title, data })
  const deleteOneFromServer = (idLocal) =>
    reqDeleteOneFromServer({ ...apiFunction, idLocal })
  const deleteFromServer = (list) =>
    reqDeleteFromServer({ ...apiFunction, list })
  const renameFolderFromServer = (newtitle) =>
    reqRenameFolderFromServer({ ...apiFunction, newtitle })
  const renameCardFromServer = (newtitle, newdata) =>
    reqRenameCardFromServer({ ...apiFunction, newtitle, newdata })
  const apiFunction = {
    id,
    dirPath,
    setDirPath,
    setIsLoading,
    setIsSubmitLoading,
    setFolders,
    setCards,
    folders,
    cards,
    fetchData,
    contextMenuCordinate,
    closeContextMenu,
    deleteOff,
    handleCancel,
    closeModal,
    fetchData,
  }

  const folderClicked = (title, id, history) => {
    if (isLoading) return
    // const newPath = [...dirPath, { title, page: id }]
    // setDirPath(newPath)
    history.push(`/${id}`)
  }

  const dirClicked = (index, page, history) => {
    // const newDir = dirPath.slice(0, index + 1)
    // setDirPath(newDir)
    // fetchData()
    history.push(`/${page}`)
  }

  const toggleSelectFolder = (id) => {
    const newFolders = folders.map((item) => {
      if (item._id === id) return { ...item, clicked: !item.clicked }
      return item
    })
    setFolders(newFolders)
  }
  const toggleSelectCard = (id) => {
    const newCards = cards.map((item) => {
      if (item._id === id) return { ...item, clicked: !item.clicked }
      return item
    })
    setCards(newCards)
  }

  const toggleSelectAll = (type) => {
    const newFolders = folders.map((item) => {
      return { ...item, clicked: type }
    })
    const newCards = cards.map((item) => {
      return { ...item, clicked: type }
    })
    setFolders(newFolders)
    setCards(newCards)
  }

  const handleContextMenu = (e, id, type) => {
    e.preventDefault()
    if (isDelete) return
    let x = e.clientX || "0"
    let y = e.clientY || "0"
    if (x + 150 > window.innerWidth) {
      x = x - 155
    }
    if (y + 80 > window.innerHeight) {
      y = y - 80
    }

    const data = {
      x,
      y,
      id,
      show: true,
      type,
    }
    setContextMenuCordinate(data)
    changeOnSelection(type, id)
  }
  const changeOnSelection = (type, id) => {
    if (type === "folder") {
      const newFolders = folders.map((item) => {
        if (item._id === id) {
          return { ...item, clicked: true }
        }
        return item
      })
      setFolders(newFolders)
    }
    if (type === "card") {
      const newCards = cards.map((item) => {
        if (item._id === id) {
          return { ...item, clicked: true }
        }
        return item
      })
      setCards(newCards)
    }
  }
  const handleRename = (type) => {
    openModal(`rename${type}`)
    closeContextMenu()
  }

  useEffect(() => {
    if (!isDelete) {
      toggleSelectAll(false)
    }
  }, [isDelete])

  const makePdf = (name) => {
    const doc = new jsPDF()
    for (let i = 0; i < 10; i++) {
      doc.text("hello", 0, 0 + i * 5)
    }
    doc.save(`${name}.pdf`)
    handleCancel()
  }

  const value = {
    folders,
    cards,
    setCards,
    folderClicked,
    isLoading,
    dirPath,
    dirClicked,
    isModal,
    openModal,
    closeModal,
    modalType,
    setModalType,
    addFolder,
    addCard,
    isDelete,
    deleteOff,
    deleteOn,
    toggleSelectFolder,
    toggleSelectCard,
    toggleSelectAll,
    deleteFromServer,
    toggleDeleteOnOff,
    showBarCordinate,
    setShowBarCordinate,
    contextMenuCordinate,
    setContextMenuCordinate,
    handleContextMenu,
    renameFolderFromServer,
    renameCardFromServer,
    handleRename,
    handleCancel,
    deleteOneFromServer,
    clicked,
    setClicked,
    setIsModal,
    isMenuBar,
    menuBarOpen,
    menuBarClose,
    toggleMenuBar,
    user,
    setUser,
    popType,
    setPopType,
    isSubmitLoading,
    setIsSubmitLoading,
    makePdf,
  }
  return <Consumer.Provider value={value}>{children}</Consumer.Provider>
}

export const useGlobalContext = () => {
  return useContext(Consumer)
}
