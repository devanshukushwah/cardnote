export const reducer = (state, action) => {
  let newFolder,
    newCard,
    newFolders,
    newCards,
    closeContextMenuCordinate = {
      ...state.contextMenuCordinate,
      show: false,
    },
    closeShowBarCordinate = {
      ...state.showBarCordinate,
      type: "nothing",
      show: false,
    },
    newClicked

  const checkClicked = (folders, cards) => {
    const clickedFolders = folders.filter((item) => item.clicked === true).length
    const clickedCards = cards.filter((item) => item.clicked === true).length
    return clickedFolders + clickedCards
  }

  switch (action.type) {
    case "LOADING_ON":
      return { ...state, isLoading: true, isModal: false }

    case "LOADING_OFF":
      return { ...state, isLoading: false }

    case "SUBMIT_LOADING_ON":
      return { ...state, isSubmitLoading: true }

    case "PDF_CREATED":
      return { ...state, isSubmitLoading: false, isModal: false }

    case "FETCH_DATA":
      return {
        ...state,
        folders: action.payload.folders,
        cards: action.payload.cards,
        dirPath: action.payload.directoryPath,
        isLoading: false,
        isModal: false,
        isSubmitLoading: false,
        isMenubar: false,
        clicked: 0,
      }

    case "ADD_FOLDER":
      newFolder = [...state.folders, action.payload]
      return {
        ...state,
        folders: newFolder,
        isModal: false,
        isSubmitLoading: false,
        isLoading: false,
        showBarCordinate: closeShowBarCordinate,
      }

    case "ADD_CARD":
      newCard = [...state.cards, action.payload]
      return {
        ...state,
        cards: newCard,
        isModal: false,
        isSubmitLoading: false,
        isLoading: false,
        showBarCordinate: closeShowBarCordinate,
      }

    case "SWAP_CARD":
      newCards = state.cards.map((item) => {
        if (item._id === action.payload) return { ...item, title: item.data, data: item.title }
        return item
      })

      return { ...state, cards: newCards }

    case "REMOVE_DATA":
      newFolders = state.folders.filter((item) => item._id !== action.payload)
      newCards = state.cards.filter((item) => item._id !== action.payload)
      return { ...state, folders: newFolders, cards: newCards, isModal: false }

    case "RENAME_FOLDER":
      newFolders = state.folders.map((item) => {
        if (item._id === action.payload.id) return { ...item, title: action.payload.newtitle, clicked: false }
        return item
      })

      return {
        ...state,
        folders: newFolders,
        isModal: false,
        isSubmitLoading: false,
      }

    case "RENAME_CARD":
      newCards = state.cards.map((item) => {
        if (item._id === action.payload.id)
          return {
            ...item,
            title: action.payload.newtitle,
            data: action.payload.newdata,
            clicked: false,
          }
        return item
      })
      return {
        ...state,
        cards: newCards,
        isModal: false,
        isSubmitLoading: false,
      }

    case "TOGGLE_SELECT_FOLDER":
      newFolders = state.folders.map((item) => {
        if (item._id === action.payload) return { ...item, clicked: !item.clicked }
        return item
      })
      newClicked = checkClicked(newFolders, state.cards)
      return { ...state, folders: newFolders, clicked: newClicked }

    case "TOGGLE_SELECT_CARD":
      newCards = state.cards.map((item) => {
        if (item._id === action.payload) return { ...item, clicked: !item.clicked }
        return item
      })
      newClicked = checkClicked(state.folders, newCards)
      return { ...state, cards: newCards, clicked: newClicked }

    case "TOGGLE_SELECT_ALL":
      newFolders = state.folders.map((item) => {
        return { ...item, clicked: action.payload }
      })
      newCards = state.cards.map((item) => {
        return { ...item, clicked: action.payload }
      })

      newClicked = checkClicked(newFolders, newCards)
      return {
        ...state,
        folders: newFolders,
        cards: newCards,
        clicked: newClicked,
      }

    case "CONTEXT_MENU_CORDINATE":
      newFolders = state.folders.map((item) => {
        if (item._id === action.payload.id) {
          return { ...item, clicked: true }
        }
        return item
      })
      newCards = state.cards.map((item) => {
        if (item._id === action.payload.id) {
          return { ...item, clicked: true }
        }
        return item
      })
      return {
        ...state,
        folders: newFolders,
        cards: newCards,
        isMenuBar: false,
        showBarCordinate: closeShowBarCordinate,
        contextMenuCordinate: action.payload,
      }

    case "CLOSE_CONTEXT_MENU_CORDINATE":
      return { ...state, contextMenuCordinate: closeContextMenuCordinate }

    case "OPEN_MODAL":
      return { ...state, isModal: true, modalType: action.payload }

    case "CLOSE_MODAL":
      newFolders = state.folders.map((item) => {
        return { ...item, clicked: false }
      })
      newCards = state.cards.map((item) => {
        return { ...item, clicked: false }
      })
      return {
        ...state,
        isModal: false,
        isSubmitLoading: false,
        modalType: "card",
        folders: newFolders,
        cards: newCards,
        showBarCordinate: closeShowBarCordinate,
      }
    case "CARDS_ALIGNED":
      newFolders = state.folders.map((item) => {
        return { ...item, clicked: false }
      })
      newCards = action.payload.map((item) => {
        return { ...item, clicked: false }
      })
      return {
        ...state,
        folders: newFolders,
        cards: newCards,
        isModal: false,
        isSubmitLoading: false,
        modalType: "card",
        showBarCordinate: closeShowBarCordinate,
      }

    case "DELETE_ON":
      console.log(closeShowBarCordinate)
      return {
        ...state,
        isDelete: true,
        showBarCordinate: closeShowBarCordinate,
      }

    case "DELETE_OFF":
      newFolders = state.folders.map((item) => {
        return { ...item, clicked: false }
      })
      newCards = state.cards.map((item) => {
        return { ...item, clicked: false }
      })
      return { ...state, folders: newFolders, cards: newCards, isDelete: false }

    case "DELETE_TOGGLE":
      if (state.isDelete) {
        newFolders = state.folders.map((item) => {
          return { ...item, clicked: false }
        })
        newCards = state.cards.map((item) => {
          return { ...item, clicked: false }
        })
        return {
          ...state,
          clicked: 0,
          folders: newFolders,
          showBarCordinate: closeShowBarCordinate,
          cards: newCards,
          isDelete: false,
        }
      }

      return {
        ...state,
        showBarCordinate: closeShowBarCordinate,
        isDelete: !state.isDelete,
        isRestore: false,
      }

    case "RESTORE_TOGGLE":
      if (state.isRestore) {
        newFolders = state.folders.map((item) => {
          return { ...item, clicked: false }
        })
        newCards = state.cards.map((item) => {
          return { ...item, clicked: false }
        })
        return {
          ...state,
          clicked: 0,
          folders: newFolders,
          cards: newCards,
          isRestore: false,
        }
      }
      return { ...state, isRestore: !state.isRestore, isDelete: false }

    case "MENU_BAR_ON":
      return { ...state, isMenuBar: true }

    case "MENU_BAR_OFF":
      return { ...state, isMenuBar: false }

    case "MENU_BAR_TOGGLE":
      return { ...state, isMenuBar: !state.isMenuBar }

    case "SET_USER":
      return { ...state, user: action.payload }

    case "SET_CLICKED":
      return { ...state, clicked: action.payload }

    case "SET_POP_TYPE":
      return {
        ...state,
        isDelete: false,
        isRestore: false,
        popType: action.payload,
        modalType: "confirmPopup",
        isModal: true,
      }

    case "SET_SHOW_BAR_CORDINATE":
      if (state.showBarCordinate.show && state.showBarCordinate.type === action.payload.type)
        return {
          ...state,
          showBarCordinate: closeShowBarCordinate,
          isDelete: false,
        }
      return {
        ...state,
        showBarCordinate: action.payload,
        isDelete: false,
      }

    case "CONTEXT_RENAME":
      return {
        ...state,
        contextMenuCordinate: closeContextMenuCordinate,
        isModal: true,
        modalType: `rename${action.payload}`,
      }

    case "CONTEXT_REMOVE":
      return {
        ...state,
        contextMenuCordinate: closeContextMenuCordinate,
        popType: "remove",
        isModal: true,
        modalType: "confirmPopup",
      }
    case "CONTEXT_ALIGN_CARD":
      return {
        ...state,
        contextMenuCordinate: closeContextMenuCordinate,
        alignCards: state.cards,
        isModal: true,
        modalType: "alignCardsPosition",
      }

    case "CONTEXT_DELETE":
      return {
        ...state,
        contextMenuCordinate: closeContextMenuCordinate,
        popType: "delete",
        isModal: true,
        modalType: "confirmPopup",
      }

    case "CONTEXT_RESTORE":
      return {
        ...state,
        contextMenuCordinate: closeContextMenuCordinate,
        popType: "restore",
        isModal: true,
        modalType: "confirmPopup",
      }

    case "HANDLE_OUTSIDE_CLICK":
      newFolders = state.folders.map((item) => {
        return { ...item, clicked: false }
      })
      newCards = state.cards.map((item) => {
        return { ...item, clicked: false }
      })

      return {
        ...state,
        contextMenuCordinate: closeContextMenuCordinate,
        folders: newFolders,
        cards: newCards,
      }

    default:
      return state
  }
}
