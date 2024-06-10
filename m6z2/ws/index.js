const webSocketServer = new require("ws");

const wss = new webSocketServer.Server({ port: 8080 });

const clients = [];

wss.on("connection", (clientSocket) => {
    let id = clients.length;
    clients[id] = clientSocket;

    console.log(`nowe połączenie ${id}`);

    clients[id].send(`Cześć, masz numer ${id}`);

    clients.forEach((client, index) => {
        if (index !== id) {
            client.send(`jest nowy client ${id}`);
        }
    });
});