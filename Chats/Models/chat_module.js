require('../../db/connect.js');
const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    from:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'Member'
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'Member'
    },
    chat:{
        type: String,
        trim: true,
        required: true
    },
    accountID:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        default: false,
    }
},{
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;