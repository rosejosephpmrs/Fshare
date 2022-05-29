const axios = require("axios").default;
const WebTorrent = require("webtorrent/webtorrent.min.js");

const axiosClient = axios.create({
    baseURL: "http://159.65.146.44:8000/api",
});

const torrentClient = new WebTorrent();

// files: the files
// can use drag-drop package
export function newTorrent(files) {
    const torrent = torrentClient.seed(files);
    return torrent;

    // torrent.torrentFile.toString("base64");
}

// torrent: torrent file
// addTorrent(new Buffer(string, "base64"))
export function addTorrent(torrent) {
    const torrentFile = torrentClient.add(torrent);
    return torrentFile;
}

export async function addUser({
    password,
    username,
    first_name,
    last_name,
    email
}) {
    console.log({
        password,
        username,
        first_name,
        last_name,
        email
    })
    return axiosClient.post("/user/", {
        password,
        username,
        first_name,
        last_name,
        email,
    });
}

export async function getMessages() {
    return axiosClient.get("/messages");
}

export async function addMessage(text, torrent_file, room_id, creator) {
    console.log("tf", torrent_file)
        // torrent_file = torrent_file[0]
        // console.log("tf", torrent_file)

    let magnet_uri = ""
        // console.log("mg", torrent.magnetURI)
    if (torrent_file) {
        const torrent = torrentClient.seed(torrent_file);
        torrent.on("ready", () => {
            magnet_uri = torrent.magnetURI
            console.log(magnet_uri);
            const response = axiosClient.post("/messages/", {
                text,
                magnet_uri,
                room_id,
                creator,
            });
            return response
        });
    } else {
        magnet_uri = null
        const response = axiosClient.post("/messages/", {
            text,
            magnet_uri,
            room_id,
            creator,
        });
        return response
    }

};

export async function getChatRooms() {
    return axiosClient.get("/chat/", {
        headers: {
            'Accept-Control-Allow-Origin': '*'
        }
    });
}

export async function createChatRoom(participants) {
    return axiosClient.post("/chat", { participants });
}