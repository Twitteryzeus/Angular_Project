require('../../db/connect.js');
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    fromtodo:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    comment:{
        type: String,
        trim: true,
        required: true
    },
    inproject:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    commentby:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
    },
    images:[Buffer],
    hide_member:[mongoose.Schema.Types.ObjectId]
},{
    timestamps: true
});

commentSchema.methods.toJSON = function(){
    const comment = this;
    const commentObject = comment.toObject();

    delete commentObject.images;
    return commentObject;
}

const comment = mongoose.model('Comment', commentSchema);
module.exports = comment;