console.log('main.js loaded');

// Global variables
let mainWS = null;    // this will be the websocket connected with the backend
let websocketIP;

// Everything in here
$(document).ready(() => {
  console.log('document ready');

  // Get server IP
  websocketIP = window.location.origin.replace(/^(http)/, 'ws');
  // websocketIP = 'ws://localhost:3000'
  console.log('websocket IP: ', websocketIP);

  // Click handlers
  $('#pingWS').click(() => {
    mainWS.send('ping');
  });
  $('#closeWS').click(() => {
    $('#statusIcon').css('color', 'OrangeRed');
    mainWS.close();
  })

  // ----------- Init the websocket and define the message handlers -----------
  // The funny part!
  function init_mainWebSocket() {
    $('#statusIcon').css('color', 'Orange');
    $('#status').text('Creating main websocket...');
    console.log('Creating main websocket...');
    mainWS = new WebSocket(websocketIP);

    // Handler called when the websocket is connected
    mainWS.onopen = function(event) {
      $('#statusIcon').css('color', 'LimeGreen');
      $('#status').text('Websocket connected');
      console.log('Main websocket connected');
    }

    // Handler called when a message is receied through the websocket
    mainWS.onmessage = function(event) {
      console.log(event.data);
      log(event.data);
    }

    // Close handlers
    mainWS.onerror = (e) => {
      $('#statusIcon').css('color', 'OrangeRed');
      $('#status').text('Error');
    }
  }

  // Check the websocket health (every 3 seconds)
  function check_mainWebSocket_health() {
    if(!mainWS || mainWS.readyState != 1) {
      init_mainWebSocket();
    }
  }
  (function() {
    check_mainWebSocket_health();
    setTimeout(arguments.callee, 3000);
  })();

  // log data
  function log(data) {
    $('#log').prepend(`<p>${data}</p>`);
  }

});
