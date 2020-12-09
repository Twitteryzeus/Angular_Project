const Role = require('../Models/role_models.js');
const auth = require('../../authorization.js');
const express = require('express');
const { findTheAdmin } = require('../../common/common.js');

const roleRouter = express.Router();

roleRouter.post('/role/admin', async (req,res) => {
    
    try
    {
        const role = await new Role(req.body);
        if(role.role !== 'Admin')
        {
            return res.status(400).send('The role must be \'Admin\'');
        }
        await role.save();
        res.send(role);
    }
    catch(error)
    {
        res.status(500).send(error.message);    
    }
});

roleRouter.post('/role/sub', auth,async (req,res) => {
   
    console.log('Here');

    try
    {
        const role = await new Role(req.body);
        const memberRole = await findTheAdmin(req.member.role);

        if(memberRole !== 'Admin')
        {
            return res.status(401).send('Only Admin can set new Role');
        }

        role.accountID = req.member.accountID;
        await role.save();
        res.send(role);
    }
    catch(error)
    {
        console.log(error)
        res.status(500).send(error);
    }

});

roleRouter.get('/role', auth, async(req,res) => {
    
    try
    {
        const roles = await Role.find({
            accountID: req.member.accountID
        });
        if(!roles)
        {
            return res.status(404).send('No role found');
        }
        res.send(roles);
    }
    catch(error)
    {
        res.status(500).send(error.message);
    }
});

roleRouter.delete('/role', auth, async (req,res) => {
    
    try
    {
        const role = await new Role(req.body);
        const memberRole = await findTheAdmin(req.member.role);
        if(memberRole !== 'Admin')
        {
            return res.status(401).send('Only Admin can delete roles');
        }
        await role.remove();
    }
    catch (error) 
    {
        res.status(500).send(error.message);    
    }
});

module.exports = roleRouter;