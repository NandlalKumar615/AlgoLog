const express = require("express");

const {getAllNotes,createNote, updateNote, deleteNote, getNoteDetails, getUserNotes, voteANote, commentOnNote, getFavouriteNotes, getRevisionNotes, addToFavourite, addToRevision, removeFromFavourite, removeFromRevision, increaseTimesRevised, decreaseTimesRevised} = require("../controllers/noteController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/notes").get(getAllNotes);
router.route("/notes/myNotes").get(isAuthenticatedUser,getUserNotes);
router.route("/notes/favouriteNotes").get(isAuthenticatedUser,getFavouriteNotes);
router.route("/notes/revisionNotes").get(isAuthenticatedUser,getRevisionNotes);
router.route("/notes/new").post(isAuthenticatedUser, createNote);
router.route("/notes/:id").put(isAuthenticatedUser, updateNote).delete(isAuthenticatedUser, deleteNote).get(getNoteDetails);
router.route("/note/vote/:id").put(isAuthenticatedUser, voteANote);
router.route("/note/comment/:id").put(isAuthenticatedUser, commentOnNote);
router.route("/note/favourite/:id").put(isAuthenticatedUser, addToFavourite);
router.route("/note/revision/:id").put(isAuthenticatedUser, addToRevision);
router.route("/note/removeFromFavourite/:id").put(isAuthenticatedUser, removeFromFavourite);
router.route("/note/removeFromRevision/:id").put(isAuthenticatedUser, removeFromRevision);
router.route("/note/increaseTimesRevised/:id").put(isAuthenticatedUser, increaseTimesRevised);
router.route("/note/decreaseTimesRevised/:id").put(isAuthenticatedUser, decreaseTimesRevised);


module.exports = router; 