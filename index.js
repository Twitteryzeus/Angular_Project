const express = require('express');
const port = 3000;
const app = express();
const http = require('http');
const socketio = require('socket.io');

//GEtting data from common
const { addChatData } = require('./common/common.js');

const cors = require('cors');
app.use(cors());

//Declaring Routers
const memberRouter = require('./Members/Routers/member_router.js');
const projectRouter = require('./Project/Routers/project_router.js');
const todoRouter = require('./Todos/Routers/todo_routers.js');
const commentRouter = require('./Comments/Routers/comment_router.js');
const roleRouter = require('./Roles/Router/role_router.js');
const { chatRouter } = require('./Chats/Routers/chat_router.js');

app.use(express.json());

//Configuring Routers
app.use(memberRouter);
app.use(projectRouter);
app.use(todoRouter);
app.use(commentRouter);
app.use(roleRouter);
app.use(chatRouter);

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (socket) => {
    console.log('Connection Establish');
        
    socket.on('sendMessage', (message) => {
        const chat = addChatData(message);
        io.emit('message',chat);
    });

    socket.on('disconnect', () => {
        io.emit('message','A user left');
    });
});

server.listen(port , () => {
    console.log('Server is running on port ',port);
});