const jwt = require('jsonwebtoken');
const Member = require('./Members/Models/member_model.js');

const auth = async (req,res,next) => {

    try
    {
        const token = req.header('Authorization').replace('Bearer ','');
        const decode = jwt.verify(token, 'ThisIsMySignKey');
        const member = await Member.findOne({ _id: decode._id, 'tokens.token': token });

        if(!member)
        {
            throw new Error('Unable to Login');
        }

        req.member = member;
        req.token = token;
        next();
    }
    catch(error)
    {
        res.status(400).send(error.message);
    }
    
}

module.exports = auth;