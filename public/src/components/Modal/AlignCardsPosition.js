import React from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useGlobalContext } from "../../contextAPI/useContext"
import { MdDragHandle } from "react-icons/md"
import CreateCancel from "../CreateCancel/CreateCancel"
import styles from "./AlignCardsPosition.module.scss"

function AlignCardsPosition() {
  const { cards, handleAlignSubmit } = useGlobalContext()
  const alignCards = [...cards]
  const handleOnDragEnd = (param) => {
    const srcIndex = param.source.index
    const desIndex = param.destination?.index
    if (desIndex === undefined || desIndex === null || srcIndex === undefined || srcIndex === null) return false
    alignCards.splice(desIndex, 0, alignCards.splice(srcIndex, 1)[0])
  }
  return (
    <>
      <div className="header">Align Cards</div>
      <DragDropContext onDragEnd={(param) => handleOnDragEnd(param)}>
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div className={styles.container} ref={provided.innerRef} {...provided.droppableProps}>
              {alignCards.map((item, i) => (
                <Draggable key={item._id} draggableId={"draggable-" + item._id} index={i}>
                  {(provided, snapshot) => (
                    <div className={styles.box} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <p>{item.title}</p>
                      <span style={{ transform: snapshot.isDragging ? "rotate(-20deg)" : "rotate(0deg)" }}>
                        <MdDragHandle size={19} fill="#333" />
                      </span>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <CreateCancel style={{ paddingRight: "10px" }} confirm="Done" handleFunction={() => handleAlignSubmit(alignCards)} />
    </>
  )
}

export default AlignCardsPosition
