const axios = require("axios").default;
const WebTorrent = require("webtorrent/webtorrent.min.js");

const axiosClient = axios.create({
  baseURL: "https://fshare-backend.malavikasmenon.repl.co/api/",
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
  const torrent = torrentClient.add(torrent);
  return torrent;
}

export async function addUser(
  password,
  username,
  first_name,
  last_name,
  email
) {
  return axiosClient.post("/user", {
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

export async function sendMessage(text, torrent_file, room_id, creator) {
  return axiosClient.post("/messages", {
    text,
    torrent_file,
    room_id,
    creator,
  });
}

export async function getChatRooms() {
  return axiosClient.get("/chat");
}

export async function createChatRoom(participants) {
  return axiosClient.post("/chat", { participants });
}
