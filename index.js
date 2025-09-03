const express=require('express')
const app=express();
const { Server } = require("socket.io");
const http=require('http');
const path=require('path')


const server=http.createServer(app)
const io=new Server(server)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

io.on("connection",(socket)=>{

      console.log(`⚡: ${socket.id} user just connected`);
      console.log(`⚡: A user just connected`);
//    socket.on("message",(data)=>{
//        socket.broadcast.emit('new-message',data)
//    })

    socket.on("message",({room,msg})=>{
       socket.to(room).emit('new-message',msg)  
   })

   socket.on("join-room",({roomid,msg})=>{
      socket.join(roomid)
      socket.to(roomid).emit('user-joined','A new User has joined')
   })



   socket.on("disconnect",()=>{
      console.log("discconected from server")
   })
})
server.listen("3000",()=>{
    console.log("connected to port 3000")
})