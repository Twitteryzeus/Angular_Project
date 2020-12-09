const express = require('express');
const auth = require('../../authorization');
const Chat = require('../Models/chat_module.js');
const { getDashboardData } = require('../../common/common.js');

const chatRouter = express.Router();

chatRouter.get('/' ,auth, (req,res) => {
    
});

chatRouter.get('/getchats',auth, async (req,res) => {
    try {
        const chat = await Chat.find({
            accountID: req.member.accountID
        });

        // console.log('Here',chat);
    
        if(!chat)
        {
            res.status(400).send('No chat records found');
        }
    
        res.send(chat);
    } catch (error) {
        res.status(500).send('Error',error.message);
    }
});

chatRouter.get('/getAllData',auth ,async ( req,res) => {
    try {
        const data = await getDashboardData(req.member);
        res.send(data);
    } catch (error) {
        console.log('Error',error.message);
    }
});

module.exports = {
    chatRouter
};