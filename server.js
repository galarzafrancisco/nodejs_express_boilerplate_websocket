// server.js

// This is the entry point. It will create a server with a websocket and
// redirect the requests to the express app.js


// BASE SETUP
// =============================================================================
'use strict';


// Global variables
// -----------------------------------------------------------------------------
const clients = {};
let clientsCount = 0;

// Requirements
// -----------------------------------------------------------------------------
const WSServer = require('ws').Server;
const server = require('http').createServer();
const app = require('./app');
// const dotenv = require('dotenv');


// Load environment
// dotenv.load();
let port = process.env.PORT || 8080;


// Mount the app
server.on('request', app.app);



// WebSocket
// =============================================================================

// Create web socket server on top of a regular http server
let wss = new WSServer({
  server: server
});

wss.on('connection', function connection(connection) {
  // Create a new client
  // ---------------------------------------------------------------------------
  let clientID = clientsCount++;
  clients[clientID] = connection;
  console.log('[+] New clientID ' + clientID);
  console.log(Object.keys(clients));

  // Message handlers
  // ---------------------------------------------------------------------------
  connection.on('message', function incoming(message) {
    console.log(`WS incomming message. ClientID: ${clientID}\tMessage: ${message}`);
    connection.send(JSON.stringify({
      type: 'info',
      data: `your client ID is ${clientID}`
    }));
    sendToAll(message, clientID);
  });

  // Delete client
  // ---------------------------------------------------------------------------
  connection.on('close', (reasonCode, description) => {
    // Delete client
    delete clients[clientID];
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    console.log(Object.keys(clients));
  });
});



server.listen(port, function() {
  console.log(`http/ws server listening on ${port}`);
});


// Forward message to all clients
function sendToAll(data, myId) {
  console.log('Send to all.');
  console.log('myId: ' + myId);
  Object.keys(clients).forEach((clientID) => {
    if (clientID != myId) {
      console.log('sending to ' + clientID);
      clients[clientID].send(`Data from client ID ${myId}: ${data}`);
    }
  });
}
