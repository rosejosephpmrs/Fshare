const axios = require("axios").default;
const WebTorrent = require("webtorrent/webtorrent.min.js");

const axiosClient = axios.create({
    baseURL: "http://139.59.50.131:8000/api",
});

const torrentClient = new WebTorrent();

// files: the files
// can use drag-drop package
export function newTorrent(files) {
    const torrent = torrentClient.seed(files, {
        announceList: [
            ["wss://AmbitiousImpracticalVariable.emmanuelantony.repl.co"],
        ],
    });
    torrent.on("upload", () => { console.log("magnet", torrent.uploadSpeed) })
    return torrent;

    // torrent.torrentFile.toString("base64");
}

// torrent: torrent file
// addTorrent(new Buffer(string, "base64"))
export function addTorrent(magnet_uri) {
    const torrent = torrentClient.add(magnet_uri);
    torrent.on("download", () => { console.log(`Download speed ${torrent.downloadSpeed} ${torrent.progress}`) })
    torrent.on("done", () => {
        torrent.files.forEach((file) => {
            file.getBlobURL((_err, url) => {
                let a = document.createElement("a")
                a.href = url;
                a.download = file.name;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                }, 0);
            })
        })
    })
    return torrent;
}

export function getActiveTorrents() {
    return torrentClient.torrents.map((torrent) => torrent.magnetURI);
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
        'password': password,
        'username': username,
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
    });
}

export async function getMessages() {
    return axiosClient.get("/messages");
}

export async function addMessage(text, torrent_file, room_id, creator) {
    console.log("form", text, torrent_file)
        // torrent_file = torrent_file[0]
        // console.log("tf", torrent_file)

    let magnet_uri = ""
        // console.log("mg", torrent.magnetURI)
    if (torrent_file) {
        const torrent = torrentClient.seed(torrent_file, {
            announceList: [
                ["wss://AmbitiousImpracticalVariable.emmanuelantony.repl.co"],
            ],
        });
        torrent.on("upload", () => { console.log("magnet", torrent.uploadSpeed) })
        torrent.on("ready", () => {
            magnet_uri = torrent.magnetURI
            console.log("form", magnet_uri);
            const response = axiosClient.post("/messages-write/", {
                text,
                magnet_uri,
                room_id,
                creator,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log("form1", response)
            return response
        });
    } else {
        magnet_uri = null
        const response = axiosClient.post("/messages-write/", {
            text,
            magnet_uri,
            room_id,
            creator,
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
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