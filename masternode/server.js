const WebSocket = require("ws");
const port = 8000;
const wss = new WebSocket.Server({port:port});


wss.on("connection", ws => {

    console.log("Slave connected");

    ws.on("message", data =>{
        console.log(`Client has sent us: ${data}`);
    });

    ws.on("close", ()=>{
        console.log("Slave disconnected")
    });

});




