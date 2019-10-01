const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4001;
const weatherApi = require("./API/darkSky");
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

const getApiAndEmit = async socket => {
    try {
        const res = await axios.get(
            `${weatherApi.url}/${weatherApi.key}/37.8267,-122.4233`
        );
        socket.emit("FromAPI", res.data.currently.temperature)
    } catch (e) {
        console.error(`Error: ${e}`);
    }
};

let intervall;

io.on("connection", socket => {
    console.log("new client connected");
    if (intervall) {
        clearInterval(intervall)
    }
    intervall = setInterval(
        () => getApiAndEmit(socket),
        10000);
    socket.on("disconnect",
        () => console.log("Client disconnected") )
});

server.listen(port, () => console.log(`Listening on port ${port}`));
