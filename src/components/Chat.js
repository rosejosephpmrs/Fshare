import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import '../styles/Chat.css'
import { InsertEmoticon } from '@mui/icons-material';
import { SendRounded } from '@mui/icons-material';
import { useParams, useLocation } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';
import { addMessage, addTorrent, getActiveTorrents, newTorrent } from '../api/Backend';
import axios from 'axios';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CreateIcon from '@mui/icons-material/Create';



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

    
    const location = useLocation();
    const currentPath = location.pathname;
    console.log("curr", currentPath)
    let chatId = currentPath.split("/")[2]
    console.log("curr", chatId)

    let messageUrl = `http://139.59.50.131:8000/api/messages/?cid=${chatId}`

    const filterbyRoomId = (obj) => {
        if (obj.room_id == roomId){
            return true
        }
        return false
    }

    const filterSent = (obj) => {
        console.log("user", localStorage.getItem('user'))
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
        // let creator = users.find((item) => item.id === localStorage.getItem('user'))
        let creator = ''
        console.log("id1", id)
        for(let i=0; i<users.length; i++){
            // console.log("decoded1", users)
            if(users[i].id==id){
                creator = users[i].username
                console.log("id2", users[i].id)
                console.log("id3", creator)
                return creator
                // console.log("decoded" , creator)
            }
        }
       
        return creator
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
                
                const { data: response } = await axios.get(messageUrl, {headers: {
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                  }});
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
        console.log("form", e.target.text.value, e.target.file.files[0])
        const res = addMessage(e.target.text.value, e.target.file.files[0], roomId, user)
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
        setInput(e.target.files[0].name)
        // newTorrent(e.target.files[0])

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
                    {/* <form encType="multipart/form-data">
                        <input type="file" onChange={handleChange} name="file" />
                         <button type="submit" onClick={}>Upload</button> 
                    </form> */}
                    {/* <IconButton>
                        <MoreVertIcon />
                    </IconButton> */}
                </div>
            </div>
            {/*<div className="chat_main">*/}
                
                <div className='chat_body'>
                {messages.map((message) =>
                    <div className={`chat_message ${message.creator == localStorage.getItem('user') && 'chat_receiver'}`} key={message.message_id}> 
                        <span className='chat_name'>{getUserName(message.creator)}</span>
                        {message.text} {message.magnet_uri? <InsertDriveFileIcon /> : ""}
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
                {/* <InsertEmoticon /> */}
                <CreateIcon />
                <form encType="multipart/form-data" onSubmit={sendMessage}>
                    <input type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value) } name='text' />
                    {/* <IconButton> */}
                        {/* <SendRounded  onClick={sendMessage}/> */}
                        <label className='chat_fileIcon' >
                        <input type="file" onChange={handleChange} name="file" className='chat_fileUpload'/>
                        <UploadFileOutlinedIcon />
                        </label>
                        <button type="submit">Send</button>
                    {/* </IconButton> */}
                </form>
            </div>

        </div>
    )
}

export default Chat
