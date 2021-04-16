const WebSocket = require("ws");
require('dotenv').config({ path: './process.env' })

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

      ws = new WebSocket('ws://'+host+':'+port);
      ws.onopen = () => {
        console.log('Connection opened!');
      }

      ws.onclose = function() {
        ws = null;
      }
    }

    function generateRandom(){
      if (!ws) {
      showMessage("No WebSocket connection :(");

      return ;
    }

     json = { 
              "msg" :   "heartbeat",
              "timestamp" :  "timeString",
              "device" : "device01",
              "IPaddress" : "10.9.8.1",
              "data" :    [
                  { "name" : "randint", random: Math.ceil(Math.random() * 1000), "uom": "%" }
                  ]
          }

      var myJSON = JSON.stringify(json);
      ws.send(myJSON);
      console.log(myJSON)
  }

    init();
    setInterval(ws.onopen = () =>{generateRandom()},1000);

  })();
