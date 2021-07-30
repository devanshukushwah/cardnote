import { jsPDF } from "jspdf"

export default function makePdfFunction({ dispatch, name, cards }) {
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
  for (let i = 0; i < cards.length; i++) {
    printParagraph("normal", cards[i].title)
    lineNo += 1
    printParagraph("normal", cards[i].data)
    lineNo += 5
  }
  setTimeout(() => {
    doc.save(`${name}.pdf`)
    dispatch({ type: "PDF_CREATED" })
  }, 1000)
}
