const WebSocket = require('ws');

const serverShocket = new WebSocket.Server({ port: 8080 });



serverShocket.on('connection', (socket) => {
console.log('Client connected', serverShocket.clients.size);
    socket.on('message', (message) => {
        if (message instanceof Buffer || message instanceof ArrayBuffer) {
            for (const client of serverShocket.clients) {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    console.log("sending message");
                    client.send(message);
                }
            }
        }
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });
});
