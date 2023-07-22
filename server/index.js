const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const connectionHandler = require('./ws/connectionHandler');
const broadcastConnection = require('./ws/broadcastConnection');
const aWss = WSServer.getWss();
const PORT = process.env.PORT || 3000;

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg, aWss);
                break;
            case 'draw':
                broadcastConnection(ws, msg, aWss);
                break;
        }
    });
});

app.listen(PORT, () => console.log(`server is runnning on port ${PORT}`));
