const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    socket.on("send-location", (data) => {
        io.emit("received-location", {id:socket.id, ...data});
    });
    socket.on("disconnect", (id) => {
        io.emit("Disconnected",socket.id);
    });
    console.log("Connected");
});

app.get("/", (req, res) => {
    res.render("index"); });

server.listen(3000);