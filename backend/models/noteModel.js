const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Suitable Title For Your Note"],
    trim: true,
  },
  questionName: {
    type: String,
  },
  questionLink: {
    type: String,
  },
  note: {
    type: String,
    required: [true, "Please Write Note"],
  },
  explanation: {
    type: String,
  },
  algorithm: {
    type: String,
    required: [true, "Please Write Note"],
  },
  difficulty: {
    type: String,
    required: [true, "Please Select Difficulty Label"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  topic: {
    type: String,
    required: [true, "Please Select Topic"],
  },
  revision: {
    type: Number,
    default: 0,
  },
  favourite: {
    type: Number,
    default: 0,
  },
  public: {
    type: Boolean,
    // required: [true, "Please Enter note Stock"],
    // maxLength: [4, "Stock cannot exceed 4 characters"],
    default: true,
  },
  upVote:{
    type: Number,
    default: 0,
  },
  downVote:{
    type: Number,
    default: 0,
  },
  vote: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    voteType:{
      type: Number,
      required: true,
    }
  }],
  numOfComments: {
    type: Number,
    default: 0,
  },
  comment: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Note", noteSchema);
