import React from "react"
import { useGlobalContext } from "../../contextAPI/useContext"
import "./Modal.scss"
import ModalForFolderCard from "./ModalForFolderCard"
import RenameCardForm from "./SubComponent/RenameCardForm"
import RenameFolderForm from "./SubComponent/RenameFolderForm"
import ConfirmPopup from "./ConfirmPopup"
import PdfPopup from "./PdfPopup"
import AlignCardsPosition from "./AlignCardsPosition"

function Modal() {
  const { isModal, modalType } = useGlobalContext()

  return (
    <main className={isModal ? "cardnote-modal cardnote-active" : "cardnote-modal"}>
      <div className="background"></div>
      <div className="modal">
        {{
          renamefolder: <RenameFolderForm />,
          renamecard: <RenameCardForm />,
          confirmPopup: <ConfirmPopup />,
          pdfPopup: <PdfPopup />,
          alignCardsPosition: <AlignCardsPosition />,
        }[modalType] ||
          (isModal && <ModalForFolderCard />)}
      </div>
    </main>
  )
}

export default Modal
