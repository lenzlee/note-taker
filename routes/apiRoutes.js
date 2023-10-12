const express = require("express");
const router = express.Router();
const uuid = require("uuid");
const DB = require("../db/DB");

router.get("/api/notes", async function (req, res) {
  const notes = await DB.readNotes();
  return res.json(notes);
});

router.post("/api/notes", async function (req, res) {
  const currentNotes = await DB.readNotes();
  let newNote = {
    id: uuid(),
    title: req.body.title,
    text: req.body.text,
  };

  await DB.addNote([...currentNotes, newNote]);
  return res.send(newNote);
});

router.delete("/api/notes/:id", async function (req, res) {
  const noteToDelete = req.params.id;
  const currentNotes = await DB.readNotes();
  const newNoteData = currentNotes.filter((note) => note.id !== noteToDelete);

  await DB.deleteNote(newNoteData);
  return res.send(newNoteData);
});

module.exports = router;