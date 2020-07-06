var express = require("express");
var app = express();
var server = require("http").Server(app);
var port = 5002;
var io = require("socket.io")(server);
const wordModel = require('./models/word.model');
server.listen(port, () => console.log("Server running in port " + port));

let data = [];
var roomId = 0;
var roomList = [];
var gameList = [];
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
        console.log(`on create room : ${JSON.stringify(data)}`);
        roomId++;
        data.id = roomId;
        roomList.push(data);
        socket.join(roomId);
        console.log(`emit sendRoomToOwner: ` + JSON.stringify(data));
        io.to(socket.id).emit('sendRoomOwner', data);
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
        socket.join(data.roomId);
        roomList.forEach(item=>{
            if(item.id == data.roomId){
                item.players.push(data.playerName);
                console.log('emit send room info: ' + JSON.stringify(item));
                io.in(data.roomId).emit("sendRoomInfo", item);
                return;
            }
        });
    });

    socket.on("startGame",async roomId => {
        console.log(`on start game`);
        console.log(`data: ${roomId}`);
        
        const room = roomList.find(item => item.id === roomId);
        if(room != null){
            let playerOrder = room.players;
            let timer = room.timer;
            const ret = await wordModel.getRandomWord();
            const entity = {
                id: roomId,
                playerOrder,
                currentWord: ret.Word,
            }

            console.log(`emit send game`);
            io.in(roomId).emit("sendGame", entity);

            console.log(`emit timer`);
            var timerInterval = setInterval(() => {
                console.log(timer);
                if(timer === 0){
                    clearInterval(timerInterval);
                }
                io.in(roomId).emit("sendTimer", timer);
                timer = timer - 1;
            }, 1000);
        }else{
            console.log(`room null`);
            
        }
    });

    socket.on('sendWord', data => {
        console.log('on sendWord');
        console.log(data);
    });
    
});

app.get("/", (req, res) => {
    res.send("Game on!!!");
});