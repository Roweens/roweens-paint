const express = require('express');
const app = express();
const WSServer = require('express-ws')(app);
const connectionHandler = require('./ws/connectionHandler');
const broadcastConnection = require('./ws/broadcastConnection');
const aWss = WSServer.getWss();
const router = require('./routes/index.js');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cors());
app.use(express.json());
app.use('/api', router);

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
            case 'undo':
                broadcastConnection(ws, msg, aWss);
                break;
            case 'redo':
                broadcastConnection(ws, msg, aWss);
                break;
        }
    });
});

app.listen(PORT, () => console.log(`server is runnning on port ${PORT}`));
