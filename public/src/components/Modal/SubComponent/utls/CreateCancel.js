import React from "react"
import { useGlobalContext } from "../../../../contextAPI/useContext"
import styles from "./CreateCancel.module.scss"
import CirculareLoader from "../../../CirculareLoader/CirculareLoader"

function CreateCancel() {
  const { handleCancel, isSubmitLoading } = useGlobalContext()
  return (
    <>
      <div className={styles.align}>
        <div>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitLoading}>
            {isSubmitLoading ? <CirculareLoader /> : "Create"}
          </button>
        </div>
      </div>
    </>
  )
}

export default CreateCancel
