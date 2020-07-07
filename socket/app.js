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

var Room = function(id, name, numOfPlayers, password, time, players, owner){
    this.id = id;
    this.name = name;
    this.numOfPlayers = numOfPlayers;
    this.password = password;
    this.time = time;
    this.players = players;
    this.owner = owner;

    var interval;
    this.startTimer = () => {
        var tempTime = this.time;
        interval = setInterval(() => {
            console.log(tempTime);
            if(tempTime === 0){
                clearInterval(interval);
            }
            io.in(this.id).emit("sendTimer", tempTime);
            tempTime = tempTime - 1;
        }, 1000);
    }

    this.stopTimer = () =>{
        clearInterval(interval);
    }
}

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
        var newRoom = new Room(roomId, data.name, data.numOfPlayers, data.password, data.time, data.players, data.owner);
        console.log(newRoom);
        roomList.push(newRoom);
        socket.join(roomId);
        console.log(`emit sendRoomToOwner: ` + JSON.stringify(data));
        io.to(socket.id).emit('sendRoomOwner', newRoom);
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
                item.players.push(data.player);
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
        console.log(room);
        if(room != null){
            let playerOrder = room.players;
            const ret = await wordModel.getRandomWord();
            console.log(`currentWord: ${ret.Word}`);
            
            const entity = {
                id: roomId,
                playerOrder,
                currentWord: ret.Word,
            }
            
            gameList.push(entity);
            console.log(`emit send game`);
            io.in(roomId).emit("sendGame", entity);
            console.log(`emit timer`);
        
            room.startTimer();

        }else{
            console.log(`room null`);
        }
    });

    socket.on('sendWord',async data => {
        var room = roomList.find(item=>item.id === data.id);
        room.stopTimer();
        console.log('on sendWord');
        console.log(data);
        const gameId = data.id;
        const game = gameList.find(item=>item.id === gameId);
        if(game != null){
            if(wordModel.isWordValid(data.word, game.currentWord)){
                game.playerOrder.push(game.playerOrder.shift());
                game.currentWord = data.word;
                game.eliminatedPlayer = 0;
                io.in(gameId).emit('sendGame', game);
                room.startTimer();
            }else{
                const eliminatedPlayer = game.playerOrder[0].playerId;
                game.playerOrder.shift();
                game.eliminatedPlayer = eliminatedPlayer;
                io.in(gameId).emit('sendGame', game);
                if(game.playerOrder.length !== 1){
                    room.startTimer();
                }
            }
        }else{
            console.log(`game null`);
        }
    });
    
});

app.get("/", (req, res) => {
    res.send("Game on!!!");
});