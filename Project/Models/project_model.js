require('../../db/connect.js');
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    team: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Member'
    }],
    accountID: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

projectSchema.virtual('itstodos', {
    ref: 'Todo',
    localField: '_id',
    foreignField: 'inproject'
});

projectSchema.virtual('commments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'inproject',
});

//Checking if team member exists
projectSchema.pre('save', async function (next) {

    try {

        const { findTheMember } = require('../../common/common.js');
        const project = this;

        const teams = await project.team;
       
        const member = await findTheMember(teams,project.accountID);
        
        if(member.length === 0) throw new Error('Member Error');

        next();

    }
    catch (error) {
        throw new Error(error.message);

    }
});

projectSchema.pre('remove', async function(next) {
    
    try
    {
        const { deleteProjectData } = require('../../common/common.js');
        const project = this;
        await deleteProjectData(project._id);
        next();
    }
    catch (error)
    {
        
    }
});

const project = mongoose.model('project', projectSchema);
module.exports = project;