import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import '../styles/Chat.css'
import { InsertEmoticon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { FileUploader } from 'react-drag-drop-files';


function Chat({users}) {
    const [input, setInput] = useState("");
    const { userId } = useParams();
    const [user, setUser] = useState("");
    const [files, setFiles] = useState("");

    useEffect(() => {
        if (userId) {
            setUser(users.filter(user => user.id == userId)[0])
        }
    },[userId])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(e.target.value)
        setInput('')
    }

    const handleChange = (f) => {
        setFiles(f);
        console.log(files);
    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={user.picture}/>
                <div className='chat_headerInfo'>
                    <h3>{user.name}</h3>
                </div>
                <div className='chat_headerRight'>
                    <FileUploader handleChange={handleChange} name="file" multiple={true} />
                    <IconButton>
                        <UploadFileOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className='chat_body'>
                <p className={`chat_message ${true && 'chat_receiver'}`}> 
                    <span className='chat_name'></span>
                    Hey
                    <span className= 'chat_timestamp'>3.52 pm</span>
                </p>
            </div>
            <div className='chat_footer'>
                <InsertEmoticon />
                <form>
                    <input type="text" placeholder="Type a message" value={input} onChange={e => setInput(e.target.value) } />
                    <button type="submit" onClick={sendMessage}>Send</button>
                </form>
            </div>

        </div>
    )
}

export default Chat