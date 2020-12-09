require('../../db/connect.js');
const mongoose = require('mongoose');
const Comment = require('../../Comments/Models/comment_model.js');
const Member = require('../../Members/Models/member_model.js');

const todoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    stage:{
        type: String,
        enum : ['Completed','Open','Review'],
        default: 'Open',
    },
    priorities:{
        type: String,
        enum: ['Normal','Urgent'],
        default: 'Normal',
    },
    accountID:{
        type: String,
        required: true
    },
    assignedto:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
    },
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Member'
    },
    inproject:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    completedat:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: Boolean,
        default: true,
    },
},{
    timestamps: true
});

todoSchema.virtual('todocomments',{
    ref: 'Comment',
    localField: '_id',
    foreignField: 'Fromtodo'
});

todoSchema.pre('save', async function(next) {
    const todo = this;
    const newDate = new Date();
    
    if(todo.completedat.getTime() < newDate.getTime())
    {
        throw new Error('Date must be greater than todays date');
    }

    if(todo.isModified('assignedto'))
    {
        const member = await Member.findById(todo.assignedto);
        if(!member)
        {
            throw new Error('Assigned member must be registered');
        }
    }
    next();
});

todoSchema.pre('remove', async function(next) {
    const todo = this;
    
    await Comment.deleteMany({fromtodo: todo._id});
    
    next();
});

const todo = mongoose.model('Todo', todoSchema);

module.exports = todo;