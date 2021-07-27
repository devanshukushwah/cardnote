import React from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import Box from "./Box"
import { BiSelection } from "react-icons/bi"
import { IoMdDoneAll } from "react-icons/io"
import { FaTrash } from "react-icons/fa"
import { MdRestore } from "react-icons/md"
import { TiHome } from "react-icons/ti"
import SelectedItem from "./SelectedItem"
import { useHistory } from "react-router-dom"

const HomeButton = () => {
  const history = useHistory()
  return (
    <button className="homebutton" onClick={() => history.push("/homepage")}>
      <TiHome size={22} />
      <p>Home</p>
    </button>
  )
}

function TrashBar() {
  const {
    dispatch,
    isRestore,
    isDelete,
    toggleSelectAll,
    clicked,
    toggleRestoreOnOff,
    toggleDeleteOnOff,
  } = useGlobalContext()

  const handleDone = () => {
    if (!clicked) return
    if (isRestore)
      return dispatch({
        type: "SET_POP_TYPE",
        payload: "restoreSelectAllConfirm",
      })
    dispatch({ type: "SET_POP_TYPE", payload: "deleteSelectAllConfirm" })
  }

  return (
    <Box>
      <SelectedItem>
        <HomeButton />
      </SelectedItem>
      <section className="buttons">
        <div className="leftBtns">
          <button
            onClick={() => toggleSelectAll(true)}
            className={isDelete || isRestore ? "show" : "hide"}
          >
            <BiSelection className="icon" size={22} />
            <p>Select All</p>
          </button>
          <button
            onClick={handleDone}
            className={isDelete || isRestore ? "show" : "hide"}
          >
            <IoMdDoneAll className="icon" size={22} />
            <p>Done</p>
          </button>
          <button
            onClick={toggleRestoreOnOff}
            className={isRestore && !isDelete && "active"}
          >
            <MdRestore
              className={isRestore ? "icon-active" : "icon"}
              size={22}
            />
            <p>Restore</p>
          </button>
          <button
            onClick={toggleDeleteOnOff}
            className={isDelete && !isRestore && "active"}
          >
            <FaTrash className={isDelete ? "icon-active" : "icon"} size={16} />
            <p>Delete</p>
          </button>
        </div>
      </section>
    </Box>
  )
}

export default TrashBar
