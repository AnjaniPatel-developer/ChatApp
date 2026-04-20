const io = require("socket.io") (8000, {
  cors: "*"
  
});

let users = {};

io.on("connect", (socket) => {

    socket.on("user-joined", (name) => {

        socket.broadcast.emit("new-user-joined", name);
         users[socket.id] = name;
    });
    socket.on("send", (message) => {

        socket.broadcast.emit("receive",{message:message,name:users[socket.id]});
         
    });

});