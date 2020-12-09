const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../../db/connect.js');

const memberSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    accountID:{
        type: String,
    },
    phone:{
        type: String,
        required: true,
        validate(value)
        {
            if(value.length<10 || value.length>10)
            {
                throw new Error('Phone number must of 10 digit');
            }
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value.toString()))
            {
                throw new Error('The given string is not an email.');
            }
        }
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
        validate(value)
        {
            if(value.toString().length<8)
            {
                throw new Error('Password must be greater than 6 characters');
            }
        }
    },
    status:{
        type: Boolean,
        default: true
    },
    tokens:[{
        token:{
            type: String,
            required: true,
        }
    }]
},
{
    timestamps: true,
});

memberSchema.virtual('project',{
    ref: 'project',
    localField: '_id',
    foreignField: 'createdby'
});

memberSchema.virtual('createdtodo',{
    ref: 'Todo',
    localField: '_id',
    foreignField: 'createdby'
});

memberSchema.virtual('assigntodo',{
    ref: 'Todo',
    localField: '_id',
    foreignField: 'assignedto'
});

memberSchema.virtual('comment',{
    ref: 'Comment',
    localField: '_id',
    foreignField: 'commentby'
});

//Generate Authorization Token
memberSchema.methods.generateAuthToken = async function () {
    const member = this;
    const token = jwt.sign({ _id: member._id }, 'ThisIsMySignKey');
    member.tokens = member.tokens.concat({token});
    await member.save();
    return token;
}

//Check Member's Password
memberSchema.statics.findByCredentials = async (email,password) => {
    const member = await Member.findOne({ email });
    
    if(!member)
    {
        throw new Error('No such user exists');
    }

    const isMatch = await bcrypt.compare(password, member.password,);
    
    if(!isMatch)
    {
        throw new Error('Password did not exists');
    }

    return member;
}

//hash password before saving
//If admin assign new account id
memberSchema.pre('save', async function(next) {
    const member = this;

    if(member.isModified('password'))
    {
        member.password = await bcrypt.hash(member.password, 8);
    }

    next();
});

memberSchema.pre('remove', async function(next) {
    const member = this;

    const { deleteMemberData } = require('../../common/common');
    await deleteMemberData(member._id);

    next();
});

const Member = mongoose.model('Member',memberSchema);
module.exports = Member;