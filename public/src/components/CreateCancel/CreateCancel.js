import React from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import styles from "./CreateCancel.module.scss"
import CirculareLoader from "../CirculareLoader/CirculareLoader"

function CreateCancel(props) {
  const { closeModal, isSubmitLoading } = useGlobalContext()
  return (
    <>
      <div className={styles.align} {...props}>
        <div>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
          <button type={props.type || "submit"} onClick={props.handleFunction || null} disabled={isSubmitLoading}>
            {isSubmitLoading ? <CirculareLoader /> : props.confirm || "Create"}
          </button>
        </div>
      </div>
    </>
  )
}

export default CreateCancel
