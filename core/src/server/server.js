const { WebSocket, WebSocketServer } = require("ws");

const http = require("http");
const uuid = require("uuid").v4;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 9000;

const clients = {};
const users = {};
let editorContent = null;
let userActivity = [];

const eventTypes = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange",
};

function sendMessageToAllClients(message) {
  Object.values(clients).forEach((client) => client.send(JSON.stringify(message)));
}



function handleClientDisconnection(userId) {
    console.log(`${userId} disconnected.`);
    const json = { type: eventTypes.USER_EVENT };
    const username = users[userId]?.username || userId;
    userActivity.push(`${username} left the editor`);
    json.data = { users, userActivity };
    delete clients[userId];
    delete users[userId];
    sendMessageToAllClients(json);
  }

function processReceivedMessage(message, userId) {
    const dataFromClient = JSON.parse(message.toString())
    const json = {type: dataFromClient.type}

    if(dataFromClient.type === eventTypes.USER_EVENT) {
        users[userId] = dataFromClient
        userActivity.push(`${dataFromClient.username} joined the platform`)
        json.data = {users, userActivity}
    } else if (dataFromClient.type === eventTypes.CONTENT_CHANGE) {
        editorContent = dataFromClient.content
      json.data = {editorContent, userActivity}
    }
    sendMessageToAllClients(json);
}

wsServer.on("connection", function handleNewConnection(connection) {
  const userId = uuid();
  console.log("Received new connection");

  clients[userId] = connection;
  console.log(`${userId} connected`);

  connection.on("message", (message) =>
    processReceivedMessage(message, userId)
  );
  connection.on("close", () => handleClientDisconnection(userId));
});

server.listen(port, () => {
  console.log(`webSocket sever is running on port ${port}`);
});
