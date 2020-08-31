const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", socket => {

    console.log("a user connected");

    socket.on("disconnect", () => {
        console.log("a user disconnected");
    });

    socket.on("message-send", message => {
        io.emit("message", message);
    });
});


http.listen(4000, () => {
    console.log("server is running on port 4000");
});

