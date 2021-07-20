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
    <TiHome
      className="homebutton"
      size={22}
      onClick={() => history.push("/homepage")}
    />
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
            className={isDelete || isRestore ? "active" : "not-active"}
          >
            <BiSelection className="icon" size={22} />
            <p>Select All</p>
          </button>
          <button
            onClick={handleDone}
            className={isDelete || isRestore ? "active" : "not-active"}
          >
            <IoMdDoneAll className="icon" size={22} />
            <p>Done</p>
          </button>
          <button
            onClick={toggleRestoreOnOff}
            className={isRestore && !isDelete ? "btn-active" : undefined}
          >
            <MdRestore
              className={isRestore ? "icon-active" : "icon"}
              size={22}
            />
            <p>Restore</p>
          </button>
          <button
            onClick={toggleDeleteOnOff}
            className={isDelete && !isRestore ? "btn-active" : undefined}
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
