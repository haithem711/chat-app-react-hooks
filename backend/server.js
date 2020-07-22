const express=require('express')
const app=express()

const http =require ('http')
const mongoose=require ('mongoose')

app.use(express.json())


const cors=require('cors')

const mongoUri = 'mongodb+srv://haithem:99256188@native.wlzob.mongodb.net/database?retryWrites=true&w=majority'
mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (err) throw err
    console.log('data base connected...')
})
require("./Model/User");
require("./Model/Chatroom");
require("./Model/Message");
const Message =mongoose.model ('Message')
const User =mongoose.model ('User')


app.use(require('./route/auth'))
app.use(require('./route/chatroom'))


const socketio=require('socket.io')
const server=http.createServer(app)
const io=socketio(server)





server.listen(8000, () => {
  console.log("Server listening on port 8000");
});



const jwt = require("jwt-then")
const jwtSecret="secret"
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    console.log(socket.handshake.query.token)
    const payload = await jwt.verify(token, jwtSecret);
    socket.userId = payload._id;
    console.log(socket.userId)
    next();
  } catch (err) {console.log('error')}
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });
  socket.on("joinRoom",({chatroomId})=>{
    socket.join(chatroomId)
    console.log("a user joind chat room"+chatroomId)
  })
  socket.on("leaveRoom",({chatroomId})=>{
    socket.leave(chatroomId)
    console.log("a user leave room"+chatroomId)
  })
  socket.on("chatroomMessage", async ({ chatroomId, message,name }) => {
    if (message.length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit("newMessage", {
        message,
        name:user.name,
        userId: socket.userId,
      });
      await newMessage.save();
    }
  });
});