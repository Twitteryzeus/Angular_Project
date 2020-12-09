require('../../db/connect.js');
const mongoose = require('mongoose');
const Member = require('../../Members/Models/member_model.js');

const roleSchema = new mongoose.Schema({
    role:{
        type: String,
        required: true,
        trim: true,
    },
    accountID:{
        type: String,
    },
    status:{
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

roleSchema.virtual('member',{
    ref: 'Member',
    localField: '_id',
    foreignField: 'role' 
});

roleSchema.pre('save', async function(next) {
    const role = this;
    const existrole = await Role.findOne({
        role: role.role,
        accountID: role.accountID
    });

    if(existrole)
    {
        throw new Error('This role already exists');
    }

    next();
});

roleSchema.pre('remove', async function(next) {
    const role = this;
    const existMembers = await Member.find({
        role: role._id,
        accountID: role.accountID,
    });

    if(existMembers)
    {
        throw new Error('Members of this role exists');
    }
    next();
});

const Role = mongoose.model('Role',roleSchema);
module.exports = Role;