const express = require('express');
const auth = require('../../authorization.js');
const Comment = require('../Models/comment_model.js');
const commentRouter = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const Todo = require('../../Todos/Models/todo_models.js');

//setting upload restrictions
const upload = multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file , callback)
    {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        {
            return callback(new Error('File must be an image'));
        }

        callback(undefined,true);
    }
});

commentRouter.post('/comment/todo', auth, async (req,res) => {

    let comment = new Comment({
        comment: req.body.comment
    });

    const todo = await Todo.findById(req.body.fromtodo);
    
    try
    {
        if(!todo)
        {
            return res.status(401).send('No such todo exists!');
        }

        comment.fromtodo = todo._id;
        comment.inproject = todo.inproject;
        comment.commentby = req.member._id;

        await comment.save();
        comment = await Comment.findById(comment._id)
        .populate('commentby')
        res.send(comment);
    }
    catch(error)
    {
        res.status(500).send(error.message);    
    }

});

commentRouter.post('/comment/:id/image', auth,upload.array('photos',2),async (req,res) => {

    const comment = await Comment.findById(req.params.id);

    if(!comment)
    {
        return res.status(404).send('NO such comments');
    }
    
    for(var i=0; i<req.files.length; i++)
    {
        const buffer = await sharp(req.files[i].buffer).resize({ width:250, height:250 }).toBuffer();
        comment.images = comment.images.concat(buffer);
    }
    await comment.save();
    res.send();
    
},(error,req,res,next) => {
    res.status(500).send({
        error: error.message
    });
});

commentRouter.get('/:id/comment', auth , async (req,res) => {
    
    try
    {
        const comment = await Comment.find({
            fromtodo: req.params.id
        })
        .populate('commentby','name');
        res.send(comment);
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
});

commentRouter.patch('/comment', auth , async (req,res) => {
    
    const updates = Object.keys(req.body);
    const availableUpdates = ['comment', 'hide_member','id'];
    const isvalid = await updates.every((update) => availableUpdates.includes(update));

    try
    {
        if(!isvalid)
        {
            return res.status(401).send('No such updates available');
        }

        const comment = await Comment.findById(req.body.id);
        if(!comment)
        {
            return res.status(404).send('no such comments');
        }
        await Comment.findByIdAndUpdate(req.body.id,{...req.body});
        res.send();
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
});

commentRouter.delete('/comment', auth , async (req,res) => {
    
    try
    {
        const comment = await Comment.findByIdAndDelete(req.body.id);
        if(!comment)
        {
            return res.status(401).send('No such comments');
        }
        res.send(comment);
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
});

module.exports = commentRouter;