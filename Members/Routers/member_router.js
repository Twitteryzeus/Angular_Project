const Member = require('../Models/member_model.js');
const express = require('express');
const bcrypt = require('bcryptjs');
const auth = require('../../authorization.js');
const { findTheAdmin, findTheRole, createNewAdmin, createSubMember } = require('../../common/common.js');

const memberrouter = express.Router();

memberrouter.post('/member/signup', async (req, res) => {

    try {
        let member = await new Member(req.body);
        const accountID = await bcrypt.hashSync(member.name, 4);
        // Create Role
        member = await createNewAdmin(accountID, member);

        await member.save();
        const token = await member.generateAuthToken();
        res.send({
            member,
            token
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

memberrouter.post('/member/sub/signup', auth, async (req, res) => {

    try {
        let member = await new Member(req.body);

        const isadmin = await findTheAdmin(req.member.role);

        if (isadmin !== 'Admin') {
            return res.status(401).send('You are not authorized to add members');
        }

        member = await createSubMember(req.body, req.member.accountID);
        member.accountID = req.member.accountID;
        const token = await member.generateAuthToken();
        await member.save();
        res.send({
            member,
            token
        });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

memberrouter.post('/member/signin', async (req, res) => {

    try {
        const member = await Member.findByCredentials(req.body.email, req.body.password);
        const token = await member.generateAuthToken();
        res.send({
            member,
            token
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

memberrouter.patch('/member/update', auth, async (req, res) => {

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'phone', 'email', 'password', 'role'];
    const isOperationValid = updates.every((update) => allowedUpdates.includes(update));

    if (isOperationValid) {
        const isadmin = await findTheAdmin(req.member.role);
        if (isadmin !== 'Admin') {
            return res.status(401).send('Only admin can update');
        }

        if (req.body.role !== undefined) {
            const isvalidrole = await findTheRole(req.body.role, req.member.accountID);
            if (!isvalidrole) {
                return res.status(401).send('NO such role exists');
            }
        }

        try {
            updates.forEach((update) => {
                req.member[update] = req.body[update];
            });
            await req.member.save();
            res.send(req.member);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    }
    else {
        res.status(401).send('No such updates available');
    }
});

memberrouter.delete('/member/remove', auth, async (req, res) => {

    try {
        const isadmin = await findTheAdmin(req.member.role);
        if (isadmin !== 'Admin') {
            return res.status(401).send('Only Admin can delete member');
        }

        const member = await Member.findOne({
            _id: req.body.id,
            accountID: req.member.accountID
        });

        if (!member) {
            return res.status(401).send('No such member exits');
        }

        await member.remove();
        res.send(member);
    }
    catch (error) {

    }
});

memberrouter.get('/member/', auth, async (req, res) => {

    try {
        res.send(req.member);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

memberrouter.get('/member/all', auth, async (req, res) => {

    try {
        const allMember = await Member.find({ accountID: req.member.accountID });
        res.send(allMember);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

memberrouter.get('/member/logout', auth, async (req, res) => {

    try {
        req.member.tokens = await req.member.tokens.slice(req.member.tokens.length, req.member.tokens.length);
        await req.member.save();
        res.send(req.member);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = memberrouter;