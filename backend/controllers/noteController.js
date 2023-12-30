const Note = require("../models/noteModel");
const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
// const Note = require("../models/noteModel");
const User = require("../models/userModel");
// const { ObjectId } = require('mongoose');

// Create Note
exports.createNote = catchAsyncErrors(async (req, res, next) => {

    req.user.totalNotes += 1;
    await req.user.save({ validateBeforeSave: false });

    req.body.user = req.user.id
    const note = await Note.create(req.body);

    res.status(201).json({
        success: true,
        note
    })
});


// Get All Notes
exports.getAllNotes = catchAsyncErrors(async (req, res) => {

    // const resultPerPage = 5;
    // const noteCount = await Note.countDocuments();

    const searchFilter = {
        userID: false,
        public: true,
        favourite: false,

    }

    // const userID = false;
    const apiFeatures = new ApiFeatures(Note.find(), req.query).search().filter(searchFilter).pagination();
    const notes = await apiFeatures.query;
    // res.status(200).json({message:"Route is working"});

    // if(!notes){
    //     return next(new ErrorHandler("Note not found", 500));
    // }

    res.status(201).json({
        success: true,
        notes
    })
});


// Get User Notes
exports.getUserNotes = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    // const noteCount = await Note.countDocuments();

    const searchFilter = {
        userID: req.user._id,
        public: false,
        favourite: false,

    }

    // const userID = req.user._id;
    // console.log(userID);

    const apiFeatures = new ApiFeatures(Note.find(), req.query).search().filter(searchFilter).pagination(resultPerPage);
    const notes = await apiFeatures.query;
    // res.status(200).json({message:"Route is working"});

    // if(!notes){
    //     return next(new ErrorHandler("Note not found", 500));
    // }

    res.status(201).json({
        success: true,
        notes
    })
});


// Get Favourite Notes
exports.getFavouriteNotes = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    // const noteCount = await Note.countDocuments();

    const favouriteNotes = req.user.favouriteNotes;
    const notesIDArray = favouriteNotes.map(obj => obj.noteID.toString());

    const searchFilter = {
        userID: false,
        public: false,
        favourite: true,
        notesIDArray,
    }


    //    console.log(notesIDArray);

    const apiFeatures = new ApiFeatures(Note.find(), req.query).search().filter(searchFilter).pagination(resultPerPage);
    const notes = await apiFeatures.query;
    // res.status(200).json({message:"Route is working"});

    // if(!notes){
    //     return next(new ErrorHandler("Note not found", 500));
    // }

    res.status(201).json({
        success: true,
        notes
    })
});

// Get Revision Notes
exports.getRevisionNotes = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 5;
    // const noteCount = await Note.countDocuments();

    const revisionNotes = req.user.revisionNotes;
    const notesIDArray = revisionNotes.map(obj => obj.noteID.toString());

    const searchFilter = {
        userID: false,
        public: false,
        favourite: true,
        notesIDArray,
    }


    //    console.log(notesIDArray);

    const apiFeatures = new ApiFeatures(Note.find(), req.query).search().filter(searchFilter).pagination(resultPerPage);
    const notes = await apiFeatures.query;
    // res.status(200).json({message:"Route is working"});

    // if(!notes){
    //     return next(new ErrorHandler("Note not found", 500));
    // }

    res.status(201).json({
        success: true,
        notes
    })
});


// Get Note details

exports.getNoteDetails = catchAsyncErrors(async (req, res, next) => {

    let note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorHandler("Note not found", 500));
    }

    res.status(200).json({
        success: true,
        note
        // noteCount,
    });
});


// Update Note

exports.updateNote = catchAsyncErrors(async (req, res, next) => {

    let note = await Note.findById(req.params.id);

    // if(!note){
    //     return res.status(500).json({
    //         success:false,
    //         message:"Note not found"
    //     })
    // }

    if (!note) {
        return next(new ErrorHandler("Note not found", 500));
    }

    // if(!note.user==)

    note = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        note
    });
});


// Delete Note

exports.deleteNote = catchAsyncErrors(async (req, res, next) => {

    const note = await Note.findById(req.params.id);

    // if(!note){
    //     return res.status(500).json({
    //         success:false,
    //         message:"Note not found"
    //     })
    // }

    if (!note) {
        return next(new ErrorHandler("Note not found", 500));
    }

    await note.deleteOne();

    res.status(200).json({
        success: true,
        message: "Note Deleted Successfully"
    });
});


// Vote A Note

exports.voteANote = catchAsyncErrors(async (req, res, next) => {

    const note = await Note.findById(req.params.id);
    const user = await User.findById(note.user);

    if (!note) {
        return next(new ErrorHandler("Note not found", 500));
    }

    const vote = {
        user: req.user._id,
        voteType: Number(req.body.voteType),
    }

    const isVoted = note.vote.find(
        (v) => v.user.toString() === req.user._id.toString()
    );

    if (isVoted) {
        // console.log("voted");
        note.vote.forEach((v) => {
            if (v.user.toString() === req.user._id.toString()) {
                // console.log("found");

                if (!(v.voteType === vote.voteType)) {
                    v.voteType = vote.voteType;
                    if (vote.voteType === 1) {
                        note.upVote += 1;
                        note.downVote -= 1;
                    } else {
                        note.downVote += 1;
                        note.upVote -= 1;
                    }
                    // console.log("voteType");
                }else{
                    if(vote.voteType=== 1){
                        res.status(400).json({
                            success: false,
                            message: "You already upVoted this note"
                        });
                    }else{
                        res.status(400).json({
                            success: false,
                            message: "You already downVoted this note"
                        });
                    }
                }
            }
        });
    } else {
        note.vote.push(vote);
        if (vote.voteType === 1) {
            note.upVote += 1;
            user.totalUpvote += 1;
        } else {
            note.downVote += 1;
            user.totalUpvote -= 1;
        }
    }


    await user.save({ validateBeforeSave: false });
    await note.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Thanks for your vote"
    });
});



// Comment On A Note

exports.commentOnNote = catchAsyncErrors(async (req, res, next) => {

    const note = await Note.findById(req.params.id);

    if (!note) {
        return next(new ErrorHandler("Note not found", 500));
    }

    const comment = {
        user: req.user._id,
        name: req.user.name,
        comment: req.body.comment,
    }

    note.comment.push(comment);
    note.numOfComments += 1;

    // const user = await User.findById(note.user);
    // user.totalFavourite +=1;

    // await user.save({ validateBeforeSave: false });
    await note.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Thanks for your comment"
    });
});

// Add to favourite
exports.addToFavourite = catchAsyncErrors(async (req, res, next) => {

    const favouriteNote = {
        noteID: req.params.id,
    }
    req.user.favouriteNotes.push(favouriteNote);
    req.user.totalFavouriteNotes += 1;

    const note = await Note.findById(req.params.id);
    const user = await User.findById(note.user);

    user.totalFavourite += 1;
    note.favourite += 1;

    await user.save({ validateBeforeSave: false });
    await note.save({ validateBeforeSave: false });
    await req.user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Note added in favourite"
    });

})

// Remove from favourite
exports.removeFromFavourite = catchAsyncErrors(async (req, res, next) => {


    const noteID = req.params.id;
    const newArray = req.user.favouriteNotes.filter(item => item.noteID.toString() !== noteID);
    // console.log(newArray)
    req.user.favouriteNotes = newArray;
    req.user.totalFavouriteNotes = newArray.length;

    const note = await Note.findById(req.params.id);
    const user = await User.findById(note.user);

    user.totalFavourite -= 1;
    note.favourite -= 1;

    await user.save({ validateBeforeSave: false });
    await note.save({ validateBeforeSave: false });
    await req.user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Note removed from favourite"
    });

})

// Add to revision
exports.addToRevision = catchAsyncErrors(async (req, res, next) => {

    const revisionNote = {
        noteID: req.params.id,
    }
    req.user.revisionNotes.push(revisionNote);
    req.user.totalRevisionNotes += 1;

    const note = await Note.findById(req.params.id);
    note.revision += 1;
    // const user = await User.findById(note.user);

    // user.totalFavourite +=1;

    // await user.save({ validateBeforeSave: false });
    await note.save({ validateBeforeSave: false });
    await req.user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Note added for revision"
    });

})

// Remove from revision
exports.removeFromRevision = catchAsyncErrors(async (req, res, next) => {


    const noteID = req.params.id;
    const newArray = req.user.revisionNotes.filter(item => item.noteID.toString() !== noteID);
    // console.log(newArray)
    req.user.revisionNotes = newArray;
    req.user.totalRevisionNotes = newArray.length;

    const note = await Note.findById(req.params.id);
    // const user = await User.findById(note.user);

    // user.totalRevision -=1;
    note.revision -= 1;

    // await user.save({ validateBeforeSave: false });
    await note.save({ validateBeforeSave: false });
    await req.user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Note removed from revision"
    });

})


// Increase times revised
exports.increaseTimesRevised = catchAsyncErrors(async (req, res, next) => {

    const note = req.user.revisionNotes.find(item => item.noteID.toString() === req.params.id);
    // const revisionNotes = req.user.revisionNotes;
    // console.log(note.timesRevised)
    // console.log(note)
    note.timesRevised += 1;

    await req.user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Updated"
    });
})

// Decrease times revised
exports.decreaseTimesRevised = catchAsyncErrors(async (req, res, next) => {

    const note = req.user.revisionNotes.find(item => item.noteID.toString() === req.params.id);
    // console.log(note)
    // console.log(req.user.revisionNotes)
    note.timesRevised -= 1;

    await req.user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Updated"
    });
})