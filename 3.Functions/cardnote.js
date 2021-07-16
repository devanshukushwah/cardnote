const { folders, cards } = require("../1.Modal/cardnote.js")

// FOR FETCH ALL DATA
const fetchAll = async (req, res) => {
  try {
    const author = req.userId
    const newFolders = await folders(author).find()
    const newCards = await cards(author).find()
    res.status(200).json(newFolders.concat(newCards))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const fetchAllTrash = async (req, res) => {
  try {
    const author = req.userId
    const tempFolders = await folders(author).find({ trash: true })
    const tempCards = await cards(author).find({ trash: true })
    res.status(200).json(tempFolders.concat(tempCards))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// FOR FETCH ON DIRECTORY
const fetchOneDirectory = async (req, res) => {
  try {
    const author = req.userId
    let { parent } = req.params
    if (!parent) return res.json({ message: "id is null" })
    const fetchFolders = await folders(author).find({
      parent,
      trash: false,
    })
    const fetchCards = await cards(author).find({
      parent,
      trash: false,
    })
    let fetchDirectoryPath

    if (parent === "homepage") {
      fetchDirectoryPath = [{ title: "Homepage", page: "homepage" }]
    } else {
      fetchDirectoryPath = await folders(author)
        .find({ _id: parent }, { directoryPath: 1, title: 1 })
        .catch(() => {})
      const { directoryPath, title } = fetchDirectoryPath[0]
      fetchDirectoryPath = [...directoryPath, { title, page: parent }]
    }

    const fetchData = {
      folders: fetchFolders,
      cards: fetchCards,
      directoryPath: fetchDirectoryPath,
    }
    if (!fetchData) return res.status(200).json([])
    res.status(200).json(fetchData)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// FOR INSERT DATA
const postData = async (req, res) => {
  try {
    const { title, data, type, directoryPath } = req.body
    let { parent } = req.body
    const author = req.userId
    if (!parent || !title || !type)
      return res.status(422).json({ message: `some value are null` })

    let insertedItem
    if (type === "folder") {
      insertedItem = await folders(author).create({
        title,
        parent,
        directoryPath,
        author,
      })

      res.status(200).json(insertedItem)
    } else if (type === "card") {
      if (!data) res.status(422).json({ message: "data is null" })
      insertedItem = await cards(author).create({
        title,
        data,
        parent,
        author,
      })

      res.status(200).json(insertedItem)
    }
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

// TO DELETE ELEMENTS
const deleteElements = async (req, res) => {
  try {
    const author = req.userId
    const { deletelist } = req.body
    if (!deletelist) res.status(400).json({ message: "id is null" })
    await folders(author).deleteMany({
      _id: {
        $in: deletelist,
      },
    })
    await cards(author).deleteMany({
      _id: {
        $in: deletelist,
      },
    })

    res.status(200).json(tempDelete)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// TO TRASH A ELEMENTS
const moveToTrash = async (req, res) => {
  try {
    const { itemlist } = req.body
    const author = req.userId

    if (!itemlist) return res.json({ message: "item is null" })
    const tempFolder = await folders(author).updateMany(
      { _id: { $in: itemlist } },
      {
        $set: { trash: true, editedtime: Date.now() },
      },
      { alter: true }
    )
    const tempCard = await cards(author).updateMany(
      { _id: { $in: itemlist } },
      {
        $set: { trash: true, editedtime: Date.now() },
      },
      { alter: true }
    )
    res.status(200).json([tempFolder, tempCard])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// TO RESTORE A ITEM
const restoreToTrash = async (req, res) => {
  try {
    const { itemlist } = req.body
    const author = req.userId

    if (!itemlist) return res.json({ message: "item is null" })
    const tempFolder = await folders(author).updateMany(
      { _id: { $in: itemlist } },
      {
        $set: { trash: false, editedtime: Date.now() },
      },
      { alter: true }
    )
    const tempCard = await cards(author).updateMany(
      { _id: { $in: itemlist } },
      {
        $set: { trash: false, editedtime: Date.now() },
      },
      { alter: true }
    )
    res.status(200).json([tempFolder, tempCard])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// RENAME FOLDER
const renameFolder = async (req, res) => {
  try {
    const { id, newtitle } = req.body
    const author = req.userId
    if (!id || !newtitle)
      return res.status(400).json({ message: "id or new title is null" })
    const newFolder = await folders(author).updateOne(
      { _id: id },
      {
        $set: { title: newtitle, editedtime: Date.now() },
      }
    )
    res.status(200).json(newFolder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// RENAME CARD
const renameCard = async (req, res) => {
  try {
    const { id, newtitle, newdata } = req.body
    const author = req.userId

    if (!id || !newtitle || !newdata)
      return res.status(400).json({ message: "id or new title is null" })
    const newCard = await cards(author).updateOne(
      { _id: id },
      {
        $set: { title: newtitle, data: newdata, editedtime: Date.now() },
      }
    )
    res.status(200).json(newCard)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  fetchAll,
  fetchOneDirectory,
  postData,
  deleteElements,
  moveToTrash,
  restoreToTrash,
  renameFolder,
  renameCard,
  fetchAllTrash,
}
