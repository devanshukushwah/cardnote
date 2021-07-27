import React, { useContext, useEffect, useReducer } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { API_URL } from "../config/apiConfig"
import { jsPDF } from "jspdf"
import { reducer } from "./reducer"

const Consumer = React.createContext()

const defaultState = {
  folders: [],
  cards: [],
  dirPath: [{ title: "Home", page: "homepage" }],
  user: null,
  isLoading: true,
  isSubmitLoading: false,
  isModal: false,
  isMenuBar: false,
  isDelete: false,
  isRestore: false,
  clicked: 0,
  modalType: "card",
  popType: "delete",
  contextMenuCordinate: {
    x: "0",
    y: "0",
    id: null,
    show: false,
    type: "folder",
  },
  showBarCordinate: {
    x: "980.503",
    y: "128.336",
    type: "nothing",
    show: false,
  },
}

export const GlobalProvider = ({ children }) => {
  const { id } = useParams()
  const [state, dispatch] = useReducer(reducer, defaultState)

  useEffect(() => {
    fetchData()
  }, [id])

  const getClicked = () => {
    let itemlist = []
    for (let i of state.folders) {
      if (i.clicked) itemlist.push(i._id)
    }
    for (let i of state.cards) {
      if (i.clicked) itemlist.push(i._id)
    }
    return itemlist
  }

  const menuBarOpen = () => dispatch({ type: "MENU_BAR_ON" })
  const menuBarClose = () => dispatch({ type: "MENU_BAR_OFF" })
  const toggleMenuBar = () => dispatch({ type: "MENU_BAR_TOGGLE" })

  // const closeContextMenu = () =>
  //   dispatch({ type: "CLOSE_CONTEXT_MENU_CORDINATE" })

  const deleteOn = () => dispatch({ type: "DELETE_ON" })
  const deleteOff = () => dispatch({ type: "DELETE_OFF" })

  const toggleDeleteOnOff = () => {
    if (state.folders.length + state.cards.length && !state.isLoading) dispatch({ type: "DELETE_TOGGLE" })
  }

  const toggleRestoreOnOff = () => {
    if (state.folders.length + state.cards.length && !state.isLoading) dispatch({ type: "RESTORE_TOGGLE" })
  }

  const openModal = (type = null) => dispatch({ type: "OPEN_MODAL", payload: type })

  const closeModal = () => dispatch({ type: "CLOSE_MODAL" })

  // API CALLS

  const API = axios.create({ baseURL: API_URL })
  API.interceptors.request.use((req) => {
    const token = JSON.parse(localStorage.getItem("profile")).token
    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
    return req
  })

  const fetchData = async () => {
    dispatch({ type: "LOADING_ON" })
    API.get(`/cardnote-api/${id}`)
      .then((res) => dispatch({ type: "FETCH_DATA", payload: res.data }))
      .catch((err) => {
        console.log(err)
      })
  }

  const addFolder = (title) => {
    dispatch({ type: "SUBMIT_LOADING_ON" })
    const data = {
      title,
      type: "folder",
      parent: id,
      directoryPath: state.dirPath,
    }
    API.post(`/cardnote-api/`, data)
      .then((res) => dispatch({ type: "ADD_FOLDER", payload: res.data }))
      .catch((err) => console.log(err.response.data))
  }

  const addCard = (title, data) => {
    dispatch({ type: "SUBMIT_LOADING_ON" })
    const dataToSend = {
      title,
      data,
      type: "card",
      parent: id,
    }
    API.post(`/cardnote-api/`, dataToSend)
      .then((res) => dispatch({ type: "ADD_CARD", payload: res.data }))
      .catch((err) => console.log(err))
  }

  const moveOneToTrash = (id) => {
    dispatch({ type: "SUBMIT_LOADING_ON" })
    API.put("/cardnote-api/trash", { itemlist: [id] })
      .then(() => dispatch({ type: "REMOVE_DATA", payload: id }))
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteOneFromServer = (id) => {
    dispatch({ type: "SUBMIT_LOADING_ON" })
    API.delete("/cardnote-api", { data: [id] })
      .then(() => dispatch({ type: "REMOVE_DATA", payload: id }))
      .catch((err) => {
        console.log(err)
      })
  }

  const restoreOneFromTrash = (id) => {
    dispatch({ type: "SUBMIT_LOADING_ON" })
    API.put("/cardnote-api/restore", { itemlist: [id] })
      .then(() => dispatch({ type: "REMOVE_DATA", payload: id }))
      .catch((err) => {
        console.log(err)
      })
  }
  const restoreFromTrash = () => {
    dispatch({ type: "SUBMIT_LOADING_ON" })
    const itemlist = getClicked()
    API.put("/cardnote-api/restore", { itemlist })
      .then(() => fetchData())
      .catch((err) => {
        console.log(err)
      })
  }

  const moveToTrash = () => {
    dispatch({ type: "SUBMIT_LOADING_ON" })
    const itemlist = getClicked()
    API.put("/cardnote-api/trash", { itemlist })
      .then(() => fetchData())
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteFromTrash = () => {
    dispatch({ type: "SUBMIT_LOADING_ON" })
    const itemlist = getClicked()
    API.delete("/cardnote-api/", { data: itemlist })
      .then(() => fetchData())
      .catch((err) => {
        console.log(err)
      })
  }

  const renameFolderFromServer = (newtitle) => {
    dispatch({ type: "SUBMIT_LOADING_ON" })
    const id = state.contextMenuCordinate.id
    const data = {
      id,
      newtitle,
    }
    API.put("/cardnote-api/folder", data)
      .then(() => dispatch({ type: "RENAME_FOLDER", payload: data }))
      .catch((err) => console.log(err))
  }

  const renameCardFromServer = (newtitle, newdata) => {
    dispatch({ type: "SUBMIT_LOADING_ON" })
    const id = state.contextMenuCordinate.id
    const data = {
      id,
      newtitle,
      newdata,
    }
    API.put("/cardnote-api/card", data)
      .then(() => dispatch({ type: "RENAME_CARD", payload: data }))
      .catch((err) => console.log(err))
  }

  const toggleSelectFolder = (id) => dispatch({ type: "TOGGLE_SELECT_FOLDER", payload: id })
  const toggleSelectCard = (id) => dispatch({ type: "TOGGLE_SELECT_CARD", payload: id })

  const toggleSelectAll = (type) => dispatch({ type: "TOGGLE_SELECT_ALL", payload: type })

  const handleContextMenu = (e, id, type) => {
    e.preventDefault()
    if (state.isDelete) return false
    let x = e.clientX || "0"
    let y = e.clientY || "0"
    if (x + 150 > window.innerWidth) {
      x -= 155
    }
    if (y + 80 > window.innerHeight) {
      y -= 80
    }
    const data = {
      x,
      y,
      id,
      show: true,
      type,
    }
    dispatch({ type: "CONTEXT_MENU_CORDINATE", payload: { data, type, id } })
  }

  const makePdf = (name) => {
    dispatch({ type: "SUBMIT_LOADING_ON" })

    const doc = new jsPDF()
    const topBottomGap = 5
    const leftRightGap = 5
    const width = doc.internal.pageSize.getWidth() - 2 * leftRightGap
    const height = doc.internal.pageSize.getHeight() - 2 * topBottomGap
    let lineNo = 10

    const printParagraph = (pos, arr) => {
      const splitText = doc.splitTextToSize(arr, width)

      for (let j = 0; j < splitText.length; j++) {
        const align = pos === "center" ? width / 2 - splitText[j].length : leftRightGap
        if (lineNo >= height) {
          doc.addPage()
          lineNo = 10
        }
        doc.text(align, lineNo, splitText[j])
        lineNo += 5
      }
    }

    doc.setFontSize(16)
    printParagraph("center", name)
    lineNo += 5
    doc.setFontSize(14)
    for (let i = 0; i < state.cards.length; i++) {
      printParagraph("normal", state.cards[i].title)
      lineNo += 1
      printParagraph("normal", state.cards[i].data)
      lineNo += 5
    }
    setTimeout(() => {
      doc.save(`${name}.pdf`)
      dispatch({ type: "PDF_CREATED" })
    }, 1000)
  }

  const value = {
    ...state,
    dispatch,
    openModal,
    closeModal,
    addFolder,
    addCard,
    deleteOff,
    deleteOn,
    toggleSelectFolder,
    deleteOneFromServer,
    toggleSelectCard,
    toggleSelectAll,
    deleteFromTrash,
    toggleDeleteOnOff,
    moveToTrash,
    restoreFromTrash,
    moveOneToTrash,
    toggleRestoreOnOff,
    handleContextMenu,
    renameFolderFromServer,
    renameCardFromServer,
    restoreOneFromTrash,
    menuBarOpen,
    menuBarClose,
    toggleMenuBar,
    makePdf,
  }
  return <Consumer.Provider value={value}>{children}</Consumer.Provider>
}

export const useGlobalContext = () => useContext(Consumer)
