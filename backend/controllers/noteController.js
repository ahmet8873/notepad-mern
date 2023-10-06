const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const User = require("../models/userModel");

// @description GET Notes
// @route  get /api/notes
// @access private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

// @description create NOTE
// @route  post /api/notes
// @access private
const createNote = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text");
  }
  const note = await Note.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.json(note);
});

// @description updates NOTE
// @route  put /api/notes/:id
// @access private
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("note not found");
  }
  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("user not found!");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("you are not authorized to update ");
  }
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedNote);
});

// @description deletes NOTE
// @route  delete /api/notes/:id
// @access private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("note not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("user not found!");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("you are not authorized to delete ");
  }

  await Note.findByIdAndDelete(req.params.id);
  res.json({ id: req.params.id });
});

module.exports = { getNotes, createNote, updateNote, deleteNote };
