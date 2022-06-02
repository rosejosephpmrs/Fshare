import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import '../styles/Chat.css'
import { InsertEmoticon } from '@mui/icons-material';
import { SendRounded } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
import { addMessage, addTorrent, getActiveTorrents, newTorrent } from '../api/Backend';
import axios from 'axios';



function Chat({rooms, users}) {
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [room, setRoom] = useState("");
    const [files, setFiles] = useState();
    const [user, setUser] = useState("")
    const [messages, setMessage] = useState([])
    const [sentMessages, setSentMessages] = useState([])
    const [receivedMessages, setReceivedMessages] = useState([])
    const [latestMessage, setLatestMessage] = useState({})

    const messageUrl = 'http://159.65.146.44:8000/api/messages/'

    const filterbyRoomId = (obj) => {
        if (obj.room_id == roomId){
            return true
        }
        return false
    }

    const filterSent = (obj) => {
        console.log("userid", localStorage.getItem('user'))
        if(obj.creator == localStorage.getItem('user')){
            return true
        }
        return false
    }

    const filterReceived = (obj) => {
        if(obj.creator != localStorage.getItem('user')){
            return true
        }
        return false
    }

    const getUserName = (id) => {
        // console.log("id", id)
        let creator = users.filter((user)=> user.id === id)
        console.log(creator[0].username)
        return creator[0].username
    }

    const checkSeeded = () => {
        const activeTorrents = getActiveTorrents()
        console.log("active", activeTorrents)
        let messagesToBeSeeded = []
        console.log("simple", messages)
        let messageAttach = messages.filter(message => message.magnet_uri != null)
        console.log("attach", messageAttach)
        // activeTorrents.forEach(item => {
        //     messagesToBeSeeded.push(messages.filter(message => message.magnet_uri == item))
        // });
        for(let i=0; i<messageAttach.length; i++){
            if(!activeTorrents.includes(messageAttach[i].magnet_uri))
                messagesToBeSeeded.push(messageAttach[i])
        }
        console.log("mess", messagesToBeSeeded)
        for(let i=0; i<messagesToBeSeeded.length; i++){
            console.log("Download", messagesToBeSeeded[i].magnet_uri)
            addTorrent(messagesToBeSeeded[i].magnet_uri)
        }
    }

    const fetchData = async () => {
            try {
                const { data: response } = await axios.get(messageUrl);
                // setrooms(response)
                // console.log("Messages", response)
                let filtered_messages = response.filter(filterbyRoomId)
                setMessage(filtered_messages)
                // console.log("filtered", messages)
                let sentMessageList = messages.filter(filterSent)
                setSentMessages(sentMessageList)
                let receivedMessageList = messages.filter(filterReceived)
                setReceivedMessages(receivedMessageList)
                setLatestMessage(sentMessages[sentMessages.length - 1])
                console.log("last", latestMessage)
                // if(latestMessage.magnet_uri){
                //     addTorrent(latestMessage.magnet_uri)
                // }
                console.log(messages)
                checkSeeded();
            } catch (error) {
                console.error(error)
            }
            // setLoading(false);
    };

    useEffect(() => {
        console.log("here")
        console.log("l", localStorage.getItem('user'))
        // const user_local = JSON.parse(localStorage.getItem('user'));
        // console.log("user", user_local)
        setUser(localStorage.getItem('user'))
        if (roomId) {
            setRoom(rooms.filter(room => room.room_id == roomId)[0])
            fetchData();
        }
        
        
    },[messages])

    const sendMessage = (e) => {
        // console.log(files)
        console.log(input)
        const res = addMessage(input, files, roomId, user)
        console.log("Response", res)
        e.preventDefault();
        // console.log(e.target.value)
        setInput('')

    }

    const handleChange = (e) => {
        e.preventDefault();
        // var WebTorrent = require('webtorrent');
        // var client = new WebTorrent();
        // const torrent = client.seed(files);
        // torrent.on("ready", () => {
        //   console.log(torrent.magnetURI);
        // });
        console.log("file", e.target.files[0])
        console.log(typeof(e.target.files))
        setFiles(e.target.files[0]);
        console.log("file", e.target.files[0])
        // addMessage(input, files, roomId, 2)
        console.log(files);
        newTorrent(e.target.files[0])

    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={room.picture}/>
                <div className='chat_headerInfo'>
                    <h3>{room.name}</h3>
                </div>
                <div className='chat_headerRight'>
                    {/* <FileUploader handleChange={handleChange} name="file" multiple={true} /> */}
                    {/* <IconButton>
                        <UploadFileOutlinedIcon />
                    </IconButton> */}
                    <form encType="multipart/form-data">
                        <input type="file" onChange={handleChange} name="file" />
                        {/* <button type="submit" onClick={}>Upload</button> */}
                    </form>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            {/*<div className="chat_main">*/}
                
                <div className='chat_body'>
                {messages.map((message) =>
                    <div className={`chat_message ${message.creator == localStorage.getItem('user') && 'chat_receiver'}`} key={message.message_id}> 
                        <span className='chat_name'>{getUserName(message.creator)}</span>
                        {message.text} {message.magnet_uri? "(File Attached)" : ""}
                        <span className= 'chat_timestamp'>{message.timestamp}</span>
                    </div>
                )}
                </div>
                {/*{sentMessages.map((message)=>
                <div className='chat_body' key={message.message_id}>
                    <div className={`chat_message ${true && 'chat_sender'}`}> 
                        <span className='chat_name'>{getUserName(message.creator)}</span>
                        {message.text} {message.magnet_uri? "(File Attached)" : ""}
                        <span className= 'chat_timestamp'>{message.timestamp}</span>
                    </div>
                </div>
                )}*/}
            {/*</div>*/}
            <div className='chat_footer'>
                <InsertEmoticon />
                <form encType="multipart/form-data">
                    <input type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value) } />
                    {/* <IconButton> */}
                        {/* <SendRounded  onClick={sendMessage}/> */}
                        <button type="submit" onClick={sendMessage} className="submit-btn">Send</button>
                    {/* </IconButton> */}
                </form>
            </div>

        </div>
    )
}

export default Chat
