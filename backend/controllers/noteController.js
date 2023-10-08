const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const User = require("../models/userModel");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

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

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("note not found");
  }

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

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(400);
    throw new Error("note not found");
  }

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
