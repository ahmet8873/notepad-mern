const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");

router.route("/").get(protect, getNotes).post(protect, createNote);
router.route("/:id").put(protect, updateNote).delete(protect, deleteNote);

// router.get("/", getNotes);

// router.post("/", setNote);

// router.put("/:id", updateNote);

// router.delete("/:id", deleteNote);

module.exports = router;
