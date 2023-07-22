const aWss = require('../index');

const broadcastConnection = (ws, msg, aWss) => {
    aWss.clients.forEach((client) => {
        if (client.id === msg.id) {
            client.send(JSON.stringify(msg));
        }
    });
};

module.exports = broadcastConnection;
