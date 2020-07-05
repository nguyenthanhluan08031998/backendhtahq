var express = require("express");
var app = express();
var server = require("http").Server(app);
var port = 5002;
var io = require("socket.io")(server);
server.listen(port, () => console.log("Server running in port " + port));

let data = [];
var roomId = 0;
var roomList = [];
io.on("connection", function (socket) {
    const dataServer = data;
    console.log(socket.id + ": connected");
    socket.on("disconnect", function () {
        console.log(socket.id + ": disconnected");
    });
    io.sockets.emit("getData", { data: dataServer });
    socket.on("updateData", mess => {
        data.unshift(mess.word)
        if (mess.replay) {
            data = []
        }
        io.emit("sendData", { data })
    });

    socket.on("replay", () => {
        data = []
    });

    socket.on("reload", () => {
        io.emit("sendData", { data })
    });

    //Tạo room khi có sự kiện tạo
    socket.on("createRoom", (data) => {
        console.log(`on getRoomById`);
        roomId++;
        data.id = roomId;
        console.log(data); 
        roomList.push(data);
        socket.join(roomId);
        console.log(`emit sendRoomToOwner`);
        io.to(socket.id).emit('sendRoom', data);
    });

    //Trả về room khi không có sự kiện nào gọi đến
    socket.on("getRoom", () => {
        io.sockets.emit("roomList", {roomList});
    });


    socket.on('getRoomById', roomId =>{
        console.log(`on getRoomById`);
        
        const id = roomId;
        const room = roomList.find(item=>item.id===id);
        console.log(`emit send Room for info`);
        io.to(socket.id).emit('sendRoomInfo', room);
    });

    socket.on("joinRoom", (data) => {
        console.log('on joinRoom: ');
        console.log(data);
        socket.join(data.id);
        roomList.forEach(item=>{
            if(item.id == data.roomId){
                item.players.push(data.playerName);
                console.log('on sendRoom');
                io.in(data.roomId).emit("sendRoom", item);
                return;
            }
        });
    });

    
    
});

app.get("/", (req, res) => {
    res.send("Game on!!!");
});