const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [2, "Name should have more than 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  totalFavouriteNotes: {
    type: Number,
    default: 0,
  },
  totalRevisionNotes: {
    type: Number,
    default: 0,
  },
  totalNotes: {
    type: Number,
    default: 0,
  },
  privateAccount: {
    type: Boolean,
    default: false,
    required: true,
  },
  totalFriends : {
    type: Number,
    default: 0,
  },
  totalFriendsOf : {
    type: Number,
    default: 0,
  },
  totalUpvote : {
    type: Number,
    default: 0,
  },
  totalFavourite : {
    type: Number,
    default: 0,
  },
  friends: [{
    friendID: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    friendName: {
      type: String,
      required: true,
    },
    friendAddedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  friendsOf: [{
    friendID: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    friendName: {
      type: String,
      required: true,
    },
    friendAddedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  favouriteNotes:[
      {
        noteID: {
          type: mongoose.Schema.ObjectId,
          ref: "Note",
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        }
      }
  ],
  revisionNotes:[
      {
        noteID: {
          type: mongoose.Schema.ObjectId,
          ref: "Note",
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
        timesRevised : {
          type: Number,
          default: 0,
        }
      }
  ],

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
