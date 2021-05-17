import {
    MatrixClient,
    SimpleFsStorageProvider,
} from "matrix-bot-sdk";

const config = require('./config.json');

const homeserverUrl = config.homeserver;
const accessToken = config.token;

const storage = new SimpleFsStorageProvider("bot.json");
const client = new MatrixClient(homeserverUrl, accessToken, storage);

client.on("room.invite", autoDeny);

client.start().then(() => console.log("Client started!"));

async function autoDeny(roomId, event) {
    console.log(await client.leaveRoom(roomId) + roomId + " invite rejected");
}
