require('dotenv').config({ path: './process.env' })
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

const WebSocket = require('ws');
var WebSocketServer = require("ws").Server,
    express = require("express"),
    http = require("http"),
    app = express(),
    server = http.createServer(app);
const dns = require('dns')




var dnsPromises = dns.promises;
var address;

async function test() {
  let data = await dnsPromises.lookup(hostname);
  address = data.address


app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './views')
app.set('view engine', 'ejs')
 


app.get('/', function(req, res, next){
  res.render('index.ejs', {HOSTNAME:address, PORT:port})
});

var wss = new WebSocketServer({server:server});


wss.on('connection', function connection(ws) {

  console.log(`connection is open!`);
  ws.on('message', function incoming(data) {
    console.log(data)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {

        client.send(data);
        console.log("sendingdata to all clients:"+data)

      }
    })

  })

})



server.listen(port);
console.log(`Running on http://${address}:${port}`);

}



test()