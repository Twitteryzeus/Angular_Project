// Other MOdel to delete

const Project = require('../Project/Models/project_model.js');
const Todo = require('../Todos/Models/todo_models.js');
const Comment = require('../Comments/Models/comment_model.js');
const Role = require('../Roles/Models/role_models.js');
const Member = require('../Members/Models/member_model.js');
const Chat = require('../Chats/Models/chat_module.js');

const createNewAdmin = async (accountID,memberobj) => {
    try {
        const role = await new Role({
            role: 'Admin',
            accountID
        });
        
        const member = await new Member(memberobj);
        member.role = role._id;
        member.accountID = accountID;
        await member.save();
        await role.save(); 
        return member;
    } catch (error) {
        throw new Error(error.message);
    }
};

const createSubMember = async (memberobj,accountID) => {
    try
    {
        const role = await Role.findOne({
            role: memberobj.role,
            accountID
        });
        
        if(!role)
        {
            throw new Error('No such role exists');
        }
        memberobj.role = role._id;
        const member = await new Member(memberobj);
        await member.save();
        return member;
    }
    catch (error) {
        throw new Error(error);
    }
}

const deleteMemberData = (mid) => {
    return new Promise( async (resolve) => {
        await Project.deleteMany({
            createdby: mid
        });
    
        await Todo.deleteMany({
            createdby: mid,
            assignedto: mid
        });
    
        await Comment.deleteMany({
            commentby: mid,
        });
        resolve();

    });
}

const findTheAdmin = async (roleid) => {
    const role = await Role.findById(roleid);
    if(!role)
    {
        throw new Error('No such role exits');
    }
    return role.role;
}

const findTheRole = async (_role, accountID) => {
  
    try 
    {
        const role = await Role.findOne({
            role: _role,
            accountID
        });
        if(!role)
        {
            throw new Error('No such role exists');
        }
        return role.role
    }
    catch(error)
    {
        console.log(error.message);
    }
    
}

const findTheMember = async (mid,accountID) => {
    
    try
    {
        const member = await Member.find(
            {
                _id : {
                    $in : mid
                },
                accountID : accountID
            }
        );

        return member;
    }
    catch(error)
    {
        console.log(error.message);
    }
}

const deleteProjectData = async (pid) => {
    
    try 
    {
        await Todo.deleteMany({ inproject: pid });
        await Comment.deleteMany({ inproject: pid });
    }
    catch(error)
    {
        console.log(error.message);
    }
    
}

const checkProjectExists = async (pid) => {
    
    try 
    {
        const project = await Project.findById(pid);
        return project;
    }
    catch (error) 
    {
        console.log(error.message);    
    }
}

const addChatData = async (message) => {
    
    try
    {
        const from = await Member.findById(message.from);
        const to = await Member.findById(message.to);

        if(!from || !to)
        {
            throw new Error('Members must be registered');
        }

        if(from.accountID != to.accountID)
        {
            throw new Error('Members must be from same team');
        }

        const chat = await new Chat({
            ...message,
            accountID : from.accountID
        });
        
        await chat.save();
        return chat;
    } 
    catch(error) 
    {
        console.log(error.message);
    }
}

const getDashboardData = async(member) => {
    
    try
    {
        const todo = await Todo.find({
            accountID: member.accountID
        });

        const memberObj = await Member.find({
            accountID: member.accountID
        });

        const project = await Project.find({
            accountID: member.accountID
        });

        return {
            todo,
            memberObj,
            project
        }
    }
    catch (error) {
        throw new Error(error.error);
    }
}

module.exports  =  {
    deleteMemberData,
    findTheAdmin,
    findTheRole,
    findTheMember,
    deleteProjectData,
    checkProjectExists,
    addChatData,
    createNewAdmin,
    createSubMember,
    getDashboardData
}