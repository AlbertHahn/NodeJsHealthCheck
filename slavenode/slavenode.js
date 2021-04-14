const WebSocket = require("ws");
const dotenv = require('dotenv').config()

const host = process.env.HOSTNAME;
const port = process.env.PORT;
//console.log('ws://' + host+':'+port);

(function() {

    let ws;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function init() {
      if (ws) {
        ws.onerror = ws.onopen = ws.onclose = null;
        ws.close();
      }

      ws = new WebSocket('ws://localhost:8000');
      ws.onopen = () => {
        console.log('Connection opened!');
      }

      ws.onclose = function() {
        ws = null;
      }
    }

    function generateRandom(){
        if (!ws) {
        return ;
      }
        var random = getRandomInt(3).toString();
        ws.send(random);
    }

    init();
    setInterval(ws.onopen = () =>{generateRandom()},1000);

  })();
