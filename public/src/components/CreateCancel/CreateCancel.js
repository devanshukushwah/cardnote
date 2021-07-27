import React from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import styles from "./CreateCancel.module.scss"
import CirculareLoader from "../CirculareLoader/CirculareLoader"

function CreateCancel({ confirm }) {
  const { closeModal, isSubmitLoading } = useGlobalContext()
  return (
    <>
      <div className={styles.align}>
        <div>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitLoading}>
            {isSubmitLoading ? <CirculareLoader /> : confirm || "Create"}
          </button>
        </div>
      </div>
    </>
  )
}

export default CreateCancel