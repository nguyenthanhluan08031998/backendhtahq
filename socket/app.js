var express = require("express");
var app = express();
var server = require("http").Server(app);
var port = 5002;
var io = require("socket.io")(server);
server.listen(port, () => console.log("Server running in port " + port));

let data = [];
var room = [];

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
       console.log(data); 
       room.push(data);
       socket.join(data);
       io.sockets.emit("sendRoomList", { room });
    });

    //Trả về room khi không có sự kiện nào gọi đến
    socket.on("getRoom", () => {
        io.sockets.emit("roomList", {room});
    });
    
});

app.get("/", (req, res) => {
    res.send("Game on!!!");
});