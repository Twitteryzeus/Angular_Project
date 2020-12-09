const express = require('express');
const auth = require('../../authorization.js');
const Project = require('../Models/project_model.js');
const projectrouter = express.Router();

projectrouter.post('/project', auth, async (req,res) => {

    try{

        let project = new Project(req.body);
        project.createdby = req.member._id;
        project.accountID = req.member.accountID;
        
        try {
            await project.save();
        } catch (error) {
            throw Error(error);
        }

        project2 = await Project.findById(project._id)
        .populate('team','name');

        console.log(project2);

        res.send(project2);
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

projectrouter.get('/project', auth , async (req,res) => {
    
    try
    {
        const projects  = await Project
        .find({
            accountID : req.member.accountID
        })
        .populate('team','name email')

        res.status(200).send(projects);
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
});

projectrouter.patch('/project/update', auth , async (req,res) => {
    
    const updates = Object.keys(req.body);
    const availableUpdates = ['name','team', 'description','status','id'];
    const isavailable = updates.every((update) => availableUpdates.includes(update));
    
    if(isavailable)
    {
        const update = await Project.findByIdAndUpdate(req.body.id,{ ...req.body });

        if(!update)
        {
            return res.status(500).send('Something went wrong');
        }
        res.send(update);
    }
    else
    {
        res.status(401).send('This update is not available');
    }

});

projectrouter.delete('/project', auth , async (req,res) => {
    
    try
    {
        const project = await Project.findById(req.body.id);

        if(!project)
        {
            return res.status(401).send('No such project exists');
        }
        project.remove();
        res.send();
    }
    catch(error)
    {
        res.send(error.message);
    }
});

module.exports = projectrouter;