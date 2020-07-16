var express = require("express");
var app = express();
var server = require("http").Server(app);
const moment = require('moment');
var port = 5002;
var io = require("socket.io")(server);
const wordModel = require('./models/word.model');
server.listen(port, () => console.log("Socket running in port " + port));

let data = [];
var roomId = 0;
var roomList = [];
var gameList = [];
var pointList = [];

var Game = function (id, time, playerOrder, currentWord, date, roomName) {
    this.id = id;
    this.time = time;
    this.playerOrder = playerOrder;
    this.currentWord = currentWord;
    this.date = date;
    this.roomName = roomName;
    this.historyWord = [];

    var interval;
    this.startTimer = () => {
        var tempTime = this.time;
        interval = setInterval(() => {
            console.log(tempTime);
            if (tempTime === 0) {
                console.log(`time out`);
                clearInterval(interval);
                delete this.leavePlayer;
                const eliminatedPlayer = this.playerOrder[0].playerId;
                if (this.playerOrder.length > 1) {
                    console.log(`player order length: ${this.playerOrder.length}`);
                    this.playerOrder.shift();
                    console.log(`sendGame time out ${JSON.stringify(this)}`);
                    if (this.playerOrder.length !== 1) {
                        this.startTimer();
                    }
                }

                const result = {
                    eliminatedPlayerId: eliminatedPlayer,
                    nextPlayer: this.playerOrder[0].playerName,
                    isCorrect: 'timeOut'
                }
                io.in(this.id).emit('sendResult', result); //display game result for 2 seconds
                if (this.playerOrder.length === 1) {
                    console.log(`emit send game end`);
                    setTimeout(() => {
                        const entity = {
                            winner: this.playerOrder[0].playerName,
                            historyWord: this.historyWord
                        }
                        updatePoint(this.playerOrder[0].playerId, this.playerOrder[0].playerName, this.id)
                        io.in(this.id).emit('sendGameEnd', entity);
                    }, 2000);
                } else {
                    setTimeout(() => {
                        io.in(this.id).emit('sendGame', this);
                    }, 2000);
                    this.startTimer();
                }
            }
            io.in(this.id).emit("sendTimer", tempTime);
            tempTime = tempTime - 1;
        }, 1000);
    }

    this.stopTimer = () => {
        clearInterval(interval);
    }

}

var Room = function (id, name, numOfPlayers, password, time, players, owner, isActive) {
    this.id = id;
    this.name = name;
    this.numOfPlayers = numOfPlayers;
    this.password = password;
    this.time = time;
    this.players = players;
    this.owner = owner;
    this.isActive = isActive;
    this.isStart = false;
}

var Point = function (id, name, point) {
    this.id = id;
    this.name = name;
    this.point = point;
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
        const activeRoom = roomList.filter(item => item.isActive === true);
        console.log(`emit room list: ` + JSON.stringify(activeRoom));
        io.sockets.emit("roomList", { activeRoom });
    });

    //Trả về room khi không có sự kiện nào gọi đến
    socket.on("getRoom", () => { //Get room list when access room list UI
        const activeRoom = roomList.filter(item => item.isActive === true);
        io.sockets.emit("roomList", { activeRoom });
    });


    socket.on('getRoomById', roomId => { //Get room when join room from room list
        console.log(`on getRoomById`);

        const id = roomId;
        const room = roomList.find(item => item.id === id);
        console.log(`emit send Room for info`);
        io.to(socket.id).emit('sendRoomInfo', room); //send room info for all player in room
    });

    socket.on("joinRoom", (data) => { //Join room from room list UI
        console.log('on joinRoom: ');
        console.log(data);
        socket.join(data.roomId);
        roomList.forEach(item => {
            if (item.id == data.roomId) {
                item.players.push(data.player);
                console.log('emit send room info: ' + JSON.stringify(item));
                io.in(data.roomId).emit("sendRoomInfo", item);
                const activeRoom = roomList.filter(item => item.isActive === true);
                io.sockets.emit("roomList", { activeRoom });
                return;
            }
        });
    });

    socket.on("leaveRoom", data => {
        console.log(`on leave room: ${data.roomId}, ${data.playerId}`);
        let room = roomList.find(item => item.id === data.roomId);
        if (room != null) {
            room.players = room.players.filter(item => item.playerId !== data.playerId) //remove player from room
            if (room.players.length === 0 && !room.isStart) { //set room inactive if no player left
                for (const item of roomList) {
                    if (item.id === data.roomId) {
                        item.isActive = false;
                        break;
                    }
                }
            }
        }
        socket.leave(roomId);
        const activeRoom = roomList.filter(item => item.isActive === true);
        io.sockets.emit("roomList", { activeRoom });
        io.in(data.roomId).emit("sendRoomInfo", room);
    });

    socket.on("leaveGame", data => {
        console.log(`on leave game: ${data.gameId}, ${data.playerId}`);
        const game = gameList.find(item => item.id === data.gameId);
        if (game != null) {
            if (game.playerOrder.length === 0 || game.playerOrder.length === 1) {
                socket.leave(data.gameId);
                return;
            }

            let player = game.playerOrder.find(item => item.playerId == data.playerId);
            if (player != null) {
                game.leavePlayer = player.playerName;
                game.playerOrder = game.playerOrder.filter(item => item.playerId !== data.playerId) //remove player from room
                socket.leave(data.gameId);
            } else {
                socket.leave(data.gameId);
                return;
            }

            if (game.playerOrder.length === 1) {
                game.stopTimer();
                console.log(`emit send game end`);
                setTimeout(() => {
                    const entity = {
                        winner: game.playerOrder[0].playerName,
                        historyWord: game.historyWord
                    }
                    updatePoint(this.playerOrder[0].playerId, this.playerOrder[0].playerName, game.id)
                    io.in(game.id).emit('sendGameEnd', entity);
                }, 2000);
            } else {
                setTimeout(() => {
                    io.in(game.id).emit('sendGame', game);
                }, 2000);
                game.stopTimer();
                game.startTimer();
            }
            console.log(`emit leave game ${JSON.stringify(game)}`);
            io.in(game.id).emit("sendGame", game);
        }
    });

    socket.on("joinGame", data => { // when start, all player leave room and join game
        console.log(`on join game`);
        socket.leave(data.roomId);
        socket.join(data.gameId);

    })

    socket.on("startGame", async roomId => {
        console.log(`on start game`);
        console.log(`data: ${roomId}`);

        const room = roomList.find(item => item.id === roomId);
        console.log(room);
        if (room != null) {
            let playerOrder = room.players.filter(x => x.isPlay);
            const ret = await wordModel.getRandomWord();
            console.log(`currentWord: ${ret.Word}`);
            const gameId = 10000 + roomId;
            const dateTime = moment().valueOf();
            let game = new Game(gameId, room.time, playerOrder, ret.Word, dateTime, room.name);
            gameList.push(game); // add to game list
            for (let item of roomList) {
                if (item.id === roomId) {
                    // item.isActive = false;
                    item.isStart = true;
                    break;
                }
            } //set room not active in room list
            console.log(`emit send game`);
            io.in(roomId).emit("sendGame", game);
            console.log(`emit timer`);
            game.startTimer();
            console.log(`emit room list`);
            const activeRoom = roomList.filter(item => item.isActive === true);
            io.sockets.emit("roomList", { activeRoom });
        } else {
            console.log(`room null`);
        }
    });

    socket.on('sendWord', async data => {
        let gameItem = gameList.find(item => item.id === data.id);
        console.log(`on sendWord ${JSON.stringify(gameItem)}`);
        if (gameItem !== null) {
            gameItem.stopTimer();
            console.log(data);
            const gameId = gameItem.id;
            const historyWord = gameItem.historyWord.find(item => item.word == data.word);
            if (historyWord !== undefined) {
                const eliminatedPlayer = gameItem.playerOrder[0].playerId;
                gameItem.playerOrder.shift();
                const result = {
                    eliminatedPlayerId: eliminatedPlayer,
                    nextPlayer: gameItem.playerOrder[0].playerName,
                    isCorrect: 'wordExisted'
                }

                io.in(gameId).emit('sendResult', result); //display answer result for 2 seconds
                if (gameItem.playerOrder.length === 1) {
                    console.log(`emit send game end`);
                    setTimeout(() => {
                        const entity = {
                            winner: gameItem.playerOrder[0].playerName,
                            historyWord: gameItem.historyWord
                        }
                        updatePoint(gameItem.playerOrder[0].playerId, gameItem.playerOrder[0].playerName, gameItem.id)
                        io.in(gameId).emit('sendGameEnd', entity); //Send game result to all player in game room
                    }, 2000);
                } else {
                    setTimeout(() => {
                        io.in(gameId).emit('sendGame', gameItem);
                    }, 2000);
                    gameItem.startTimer();
                }
            } else {
                if (await wordModel.isWordValid(data.word, gameItem.currentWord)) {
                    console.log('corret word');
                    const entity = {
                        playerName: gameItem.playerOrder[0].playerName,
                        word: data.word
                    }
                    gameItem.historyWord.push(entity);
                    gameItem.playerOrder.push(gameItem.playerOrder.shift());
                    gameItem.currentWord = data.word;
                    gameItem.eliminatedPlayer = 0;

                    const result = {
                        eliminatedPlayerId: 0,
                        nextPlayer: gameItem.playerOrder[0].playerName,
                        isCorrect: 'true'
                    }
                    io.in(gameId).emit('sendResult', result); //display answer result for 2 secondss
                    setTimeout(() => {

                        io.in(gameId).emit('sendGame', gameItem);
                    }, 2000);

                    gameItem.startTimer();
                } else {
                    console.log('wrong word');
                    let eliminatedPlayer = gameItem.playerOrder[0].playerId;
                    if (gameItem.playerOrder.length > 1) {
                        eliminatedPlayer = gameItem.playerOrder[0].playerId;
                        gameItem.playerOrder.shift();
                        gameItem.eliminatedPlayer = eliminatedPlayer;
                    }

                    const result = {
                        eliminatedPlayerId: eliminatedPlayer,
                        nextPlayer: gameItem.playerOrder[0].playerName,
                        isCorrect: 'false'
                    }

                    io.in(gameId).emit('sendResult', result); //display answer result for 2 seconds
                    if (gameItem.playerOrder.length === 1) {
                        console.log(`emit send game end`);
                        setTimeout(() => {
                            const entity = {
                                winner: gameItem.playerOrder[0].playerName,
                                historyWord: gameItem.historyWord
                            }
                            updatePoint(gameItem.playerOrder[0].playerId, gameItem.playerOrder[0].playerName, gameItem.id)
                            io.in(gameId).emit('sendGameEnd', entity); //Send game result to all player in game room
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            io.in(gameId).emit('sendGame', gameItem);
                        }, 2000);
                        gameItem.startTimer();
                    }
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
        console.log(JSON.stringify(room));
        if (room === undefined) {
            console.log(`room not exitst`);
            console.log(`room List: ${JSON.stringify(roomList)}`);
            const oldRoom = roomList.find(item => item.id === id);
            let index = roomList.findIndex(x => x.id == id)
            if (index > -1) {
                roomList[index].isActive = false
            }

            console.log(`old room: ${JSON.stringify(oldRoom)}`);
            const player = {
                playerId: data.playerId,
                playerName: data.playerName
            };
            let players = [];
            players.push(player);
            var newRoom = new Room(newRoomId, oldRoom.name, oldRoom.numOfPlayers, oldRoom.password, oldRoom.time, players, oldRoom.owner, true);
            roomList.push(newRoom);
            socket.join(newRoomId);
            console.log('emit send new room info: ' + JSON.stringify(newRoom));
            io.to(socket.id).emit("sendNewRoomInfo", newRoom);
            socket.leave(data.gameId);
            const activeRoom = roomList.filter(item => item.isActive === true);
            io.sockets.emit("roomList", { activeRoom });
        } else {
            console.log(`room exitst`);
            roomList.forEach(item => {
                const player = {
                    playerId: data.playerId,
                    playerName: data.playerName
                };
                if (item.id == newRoomId) {
                    socket.join(newRoomId);
                    item.players.push(player);
                    console.log('emit send new room info: ' + JSON.stringify(room));
                    io.to(socket.id).emit("sendNewRoomInfo", room);
                    io.to(newRoomId).emit("sendRoomInfo", room);
                    socket.leave(data.gameId);
                    const activeRoom = roomList.filter(item => item.isActive === true);
                    io.sockets.emit("roomList", { activeRoom });
                    return;
                }
            });
        }
        const activeRoom = roomList.filter(item => item.isActive === true);
        io.sockets.emit("roomList", { activeRoom });
    });

    socket.on('getHistoryWord', gameId => {
        console.log(`on getHistoryWord: ${JSON.stringify(gameId)}`);
        console.log(`game list: ${JSON.stringify(gameList)}`);
        const game = gameList.find(item => item.id === gameId);
        console.log(`emit history word: ${JSON.stringify(game.historyWord)}`);
        io.in(socket.id).emit('sendHistoryWord', game.historyWord);
    })

    //Xoá phòng
    socket.on('deActiveRoom', roomId => {
        let room = roomList.find(item => item.id === roomId);
        socket.leave(data.roomId);
        if (room) {
            room.isActive = false
            console.log("sendDelete", socket.id)
            io.in(roomId).emit("sendDeleteRoom", room);
        }
        else {
            console.log("not find room")
        }
    })

    //Người join vào xem lấy thông tin game
    socket.on('getGameInfo', roomId => {
        let game = gameList.find(item => item.id === parseInt(roomId) + 10000);
        if (game) {
            io.to(socket.id).emit("sendViewGame", game);
        }
        else {
            console.log("not find room")
        }
    })

    //Lấy bảng xếp hạng
    socket.on('getPointList', () => {
        io.to(socket.id).emit("pointList", pointList.slice(0, 10));
    })

});
function updatePoint(id, name, gameId) {
    let index = pointList.findIndex(x => x.id == id)
    let roomId = gameId - 10000
    if (roomId > 0) {
        let romIndex = roomList.findIndex(x => x.id = roomId)
        if (romIndex > -1) {
            roomList[romIndex].isStart = false
            roomList[romIndex].isActive = false
            const activeRoom = roomList.filter(item => item.isActive === true);
            io.sockets.emit("roomList", { activeRoom })
        }
    }
    if (index > -1) {
        pointList[index].point = pointList[index].point + 100
    }
    else {
        let point = new Point(id, name, 100)
        pointList.push(point)
    }
    io.sockets.emit("pointList", pointList.sort(function (a, b) {
        return a.point - b.point;
    }));
}

app.get("/", (req, res) => {
    res.send("Game on!!!");
});