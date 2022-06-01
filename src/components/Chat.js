import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import '../styles/Chat.css'
import { InsertEmoticon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
import { addMessage } from '../api/Backend';
import axios from 'axios';


function Chat({rooms}) {
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [room, setRoom] = useState("");
    const [files, setFiles] = useState();
    const [user, setUser] = useState("")
    const [messages, setMessage] = useState([])
    const [sentMessages, setSentMessages] = useState([])
    const [receivedMessages, setReceivedMessages] = useState([])

    const messageUrl = 'http://159.65.146.44:8000/api/messages/'

    const filterbyRoomId = (obj) => {
        if (obj.room_id == roomId){
            return true
        }
        return false
    }

    const filterSent = (obj) => {
        console.log(localStorage.getItem('user'))
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
        const res = addMessage(input, files, roomId, 1)
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
            {receivedMessages.map((message) =>
            <div className='chat_body' key={message.message_id}>
                <div className={`chat_message ${true && 'chat_receiver'}`}> 
                    <span className='chat_name'></span>
                    {message.text}
                    <span className= 'chat_timestamp'>from {message.creator}</span>
                </div>
            </div>
            )}
            {sentMessages.map((message)=>
            <div className='chat_body' key={message.message_id}>
                <div className={`chat_message ${true && 'chat_sender'}`}> 
                    <span className='chat_name'></span>
                    {message.text}
                    <span className= 'chat_timestamp'>3.52pm</span>
                </div>
            </div>
            )}
            <div className='chat_footer'>
                <InsertEmoticon />
                <form encType="multipart/form-data">
                    <input type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value) } />
                    <button type="submit" onClick={sendMessage}>Send</button>
                </form>
            </div>

        </div>
    )
}

export default Chat