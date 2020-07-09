var express = require("express");
var app = express();
var server = require("http").Server(app);
var port = 5002;
var io = require("socket.io")(server);
const wordModel = require('./models/word.model');
server.listen(port, () => console.log("Socket running in port " + port));

let data = [];
var roomId = 0;
var roomList = [];
var gameList = [];

var Game = function (id, time, playerOrder, currentWord) {
    this.id = id;
    this.time = time;
    this.playerOrder = playerOrder;
    this.currentWord = currentWord;

    var interval;
    this.startTimer = () => {
        var tempTime = this.time;
        interval = setInterval(() => {
            console.log(tempTime);
            if(tempTime === 0){
                console.log(`time out`);
                clearInterval(interval);
                delete this.leavePlayer;
                
                if(this.playerOrder.length > 1){
                    console.log(`player order length: ${this.playerOrder.length}`);
                    var eliminatedPlayer = this.playerOrder[0].playerId;
                    this.playerOrder.shift();
                    this.eliminatedPlayer = eliminatedPlayer;
                    console.log(`sendGame time out ${JSON.stringify(this)}`);
                    if(this.playerOrder.length !== 1){
                        this.startTimer();
                    }
                }

                const result = {
                    eliminatedPlayerId: eliminatedPlayer,
                    nextPlayer: this.playerOrder[0].playerName,
                    isCorrect: 'timeOut'
                }
                io.in(this.id).emit('sendResult', result); //display game result for 2 seconds
                if(this.playerOrder.length === 1){
                    console.log(`emit send game end`);
                    setTimeout(()=>{
                        io.in(this.id).emit('sendGameEnd', gameList[0].playerOrder[0].playerName);
                    }, 2000);
                }else{
                    setTimeout(()=>{
                        io.in(this.id).emit('sendGame', this);
                    }, 2000);
                    this.startTimer();
                }
            }
            io.in(this.id).emit("sendTimer", tempTime);
            tempTime = tempTime - 1;
        }, 1000);
    }

    this.stopTimer = () =>{
        clearInterval(interval);
    }
    
}

var Room = function(id, name, numOfPlayers, password, time, players, owner, isActive){
    this.id = id;
    this.name = name;
    this.numOfPlayers = numOfPlayers;
    this.password = password;
    this.time = time;
    this.players = players;
    this.owner = owner;
    this.isActive = isActive;
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
        var newRoom = new Room(roomId, data.name, data.numOfPlayers, data.password, data.time, data.players, data.owner, true);
        roomList.push(newRoom);
        socket.join(roomId);
        console.log(`emit sendRoomToOwner: ` + JSON.stringify(data));
        io.to(socket.id).emit('sendRoomOwner', newRoom);
        const activeRoom = roomList.filter(item=>item.isActive===true);
        console.log(`emit room list: ` + JSON.stringify(activeRoom));
        io.sockets.emit("roomList", {activeRoom});
    });

    //Trả về room khi không có sự kiện nào gọi đến
    socket.on("getRoom", () => {
        const activeRoom = roomList.filter(item=>item.isActive===true);
        io.sockets.emit("roomList", {activeRoom});
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
                const activeRoom = roomList.filter(item=>item.isActive===true);
                io.sockets.emit("roomList", {activeRoom});
                return;
            }
        });
    });

    socket.on("leaveRoom", data => {
        console.log(`on leave room: ${data.roomId}, ${data.playerId}`);
        let room = roomList.find(item=>item.id === data.roomId);
        if(room != null){
            room.players = room.players.filter(item=>item.playerId !== data.playerId) //remove player from room
            if(room.players.length === 0){
                roomList = roomList.filter(item=>item.id !== data.roomId) //remove room if no player left
            }
        }
        socket.leave(roomId);
        const activeRoom = roomList.filter(item=>item.isActive===true);
        io.sockets.emit("roomList", {activeRoom});
        io.in(data.roomId).emit("sendRoomInfo", room);
    });

    socket.on("leaveGame", data => {
        console.log(`on leave game: ${data.gameId}, ${data.playerId}`);
        const game = gameList.find(item=>item.id === data.gameId);
        if(game != null){
            let player = game.playerOrder.find(item=>item.playerId == data.playerId);
            if(player != null){
                game.leavePlayer = player.playerName;
            }

            game.playerOrder = game.playerOrder.filter(item=>item.playerId !== data.playerId) //remove player from room
            socket.leave(data.gameId);

            if(game.playerOrder.length === 1){
                console.log(`emit send game end`);
                setTimeout(()=>{
                    io.in(game.id).emit('sendGameEnd', gameList[0].playerOrder[0].playerName);
                }, 2000);
            }else{
                setTimeout(()=>{
                    io.in(game.id).emit('sendGame', game);
                }, 2000);
                game.startTimer();
            }

            if(game.playerOrder.length > 1){
                game.stopTimer();
                game.startTimer();
            }else{
                game.stopTimer();
            }
            console.log(`emit leave game ${JSON.stringify(game)}`);
            io.in(game.id).emit("sendGame", game);
        }
    });

    socket.on("joinGame", data => {
        console.log(`on join game`);
        socket.leave(data.roomId);
        socket.join(data.gameId);
        
    })

    socket.on("startGame",async roomId => {
        console.log(`on start game`);
        console.log(`data: ${roomId}`);
        
        const room = roomList.find(item => item.id === roomId);
        console.log(room);
        if(room != null){
            let playerOrder = room.players;
            const ret = await wordModel.getRandomWord();
            console.log(`currentWord: ${ret.Word}`);
            const gameId = 10000 + roomId;
            var game = new Game(gameId, room.time, playerOrder, ret.Word);
            
            gameList.push(game); // add to game list
            for (let item of roomList) {
                if(item.id === roomId){
                    item.isActive = false;
                    break;
                }
            } //set room not active in room list
            console.log(`emit send game`);
            io.in(roomId).emit("sendGame", game);
            console.log(`emit timer`);
            game.startTimer();
            console.log(`emit room list`);
            const activeRoom = roomList.filter(item=>item.isActive===true);
            io.sockets.emit("roomList", {activeRoom});
        }else{
            console.log(`room null`);
        }
    });

    socket.on('sendWord',async data => {
        var gameItem = gameList.find(item=>item.id === data.id);
        if(gameItem !== null){
            gameItem.stopTimer();
            console.log('on sendWord');
            console.log(data);
            const gameId = gameItem.id;
            if(await wordModel.isWordValid(data.word, gameItem.currentWord)){
                console.log('corret word');
                gameItem.playerOrder.push(gameItem.playerOrder.shift());
                gameItem.currentWord = data.word;
                gameItem.eliminatedPlayer = 0;

                const result = {
                    eliminatedPlayerId: 0,
                    nextPlayer: gameItem.playerOrder[0].playerName,
                    isCorrect: 'true'
                }
                io.in(gameId).emit('sendResult', result); //display game result for 2 seconds
                setTimeout(()=>{
                    io.in(gameId).emit('sendGame', gameItem);
                }, 2000);

                gameItem.startTimer();
            }else{
                console.log('wrong word');
                const eliminatedPlayer = gameItem.playerOrder[0].playerId;
                gameItem.playerOrder.shift();
                gameItem.eliminatedPlayer = eliminatedPlayer;
                
                const result = {
                    eliminatedPlayerId: eliminatedPlayer,
                    nextPlayer: gameItem.playerOrder[0].playerName,
                    isCorrect: 'false'
                }
                
                io.in(gameId).emit('sendResult', result); //display game result for 2 seconds
                if(gameItem.playerOrder.length === 1){
                    console.log(`emit send game end`);
                    setTimeout(()=>{
                        io.in(gameId).emit('sendGameEnd', gameList[0].playerOrder[0].playerName);
                    }, 2000);
                }else{
                    setTimeout(()=>{
                        io.in(gameId).emit('sendGame', gameItem);
                    }, 2000);
                    gameItem.startTimer();
                }
            }
        }
    });

    socket.on('continueGame', data => {
        console.log(`on continue : ${JSON.stringify(data)}`);
        const id = data.gameId - 10000;
        console.log(`old room Id: ${id}`);
        const newRoomId = id + 100;
        const room = roomList.find(item => item.id === newRoomId);
        if(room === null){
            const oldRoom = roomList.find(item=>item.id === id);
            const player = {
                playerId: data.playerId,
                playerName: data.playerName
            };
            let players = [];
            players.push(player);
            var newRoom = new Room(newRoomId, oldRoom.name, oldRoom.numOfPlayers, oldRoom.password, oldRoom.time, players, oldRoom.owner, true);
            roomList.push(newRoom);
            socket.join(newRoomId);
            const activeRoom = roomList.filter(item=>item.isActive===true);
            io.sockets.emit("roomList", {activeRoom});
        }else{
            roomList.forEach(item=>{
                const player = {
                    playerId: data.playerId,
                    playerName: data.playerName
                };
                if(item.id == newRoomId){
                    item.players.push(player);
                    console.log('emit send room info: ' + JSON.stringify(item));
                    io.in(newRoomId).emit("sendRoomInfo", item);
                    const activeRoom = roomList.filter(item=>item.isActive===true);
                    io.sockets.emit("roomList", {activeRoom});
                    return;
                }
            });
        }
        
        console.log(`emit sendRoomToOwner: ` + JSON.stringify(data));
        io.to(socket.id).emit('sendRoomOwner', newRoom);
        const activeRoom = roomList.filter(item=>item.isActive===true);
        io.sockets.emit("roomList", {activeRoom});
    });
    
});

app.get("/", (req, res) => {
    res.send("Game on!!!");
});