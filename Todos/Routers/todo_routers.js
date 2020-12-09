const express = require('express');
const auth = require('../../authorization.js');
const Todo = require('../Models/todo_models.js');
const { checkProjectExists } = require('../../common/common.js');

const todoRouter = express.Router();

todoRouter.post('/todo', auth , async (req,res) => {
    
    try
    {
        const todo = await new Todo({
            title: req.body.title,
            assignedto: req.body.assignedto,
            completedat: req.body.completedat
        });

        const project = await checkProjectExists(req.body.inproject);
        
        if(!project)
        {
            return res.status(401).send('No such project exists');
        }
        todo.inproject = project._id;
        todo.createdby = req.member._id;
        todo.accountID = req.member.accountID;
        await todo.save();
        res.send(todo);
    }
    catch (error) 
    {
        res.status(500).send(error.message);
    }
});

todoRouter.get('/todo/mytodo', auth, async (req,res) => {

    try
    {
        const todo = await req.member.populate({ path: 'createdtodo'}).execPopulate();
        res.send(todo.createdtodo);
    }
    catch(error)
    {
        res.status(500).send(error.message);    
    }
});

todoRouter.get('/todo/:id',auth,async (req,res) => {
    
    try
    {
        const thatTodos = await Todo.find({
            inproject: req.params.id
        })
        .populate('assignedto');
        
        res.send(thatTodos);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

todoRouter.get('/todo/assigntodo', auth, async (req,res) => {
    
    try
    {
        const todo = await req.member.populate({
            path: 'assigntodo'
        }).execPopulate();
        if(todo.assigntodo.toString() === '' || todo.assigntodo.toString() === null)
        {
            return res.status(404).send('NO assign todo');
        }
        res.send(todo.assigntodo);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

todoRouter.patch('/todo/updatetodo', auth , async (req,res) => {
    const updates = Object.keys(req.body);
    const availableUpdates = ['title','stage','priorities','assignedto','completedat','status','id'];
    const isvalid = updates.every((update) => availableUpdates.includes(update));

    try
    {
        if(!isvalid)
        {
            return res.status(400).send('No such updates available');
        }

        let todo = await Todo.findOne({
            _id: req.body.id,
            createdby: req.member._id
        });

        if(!todo)
        {
            return res.status(401).send('No such todo exist');
        }

        todo = await Todo.findByIdAndUpdate(req.body.id,{...req.body});
        res.send(todo);
    } 
    catch(error)
    {
        res.status(500).send(error.message);
    }
});

todoRouter.delete('/todo/delete', auth, async (req,res) => {
    
    try
    {
        const todo = await Todo.findById(req.body.id);
        
        if(!todo)
        {
            return res.status(401).send('NO such todo exists');
        }
        await todo.remove();
        res.send(todo);
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
});

module.exports = todoRouter;