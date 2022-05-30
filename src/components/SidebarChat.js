import { Avatar } from '@mui/material'
import React from 'react'
import '../styles/SidebarChat.css'
import {Link} from 'react-router-dom'

function SidebarChat({addNewChat, name, id, image, lastChat, timestamp}) {

    const createChat = () => {
        const roomName= prompt("Enter new room name");
        console.log(roomName)
    }

 return  !addNewChat ? (
     <Link to={`/chat/${id}/`} className="link">
        <div className='sidebarChat'>
            <Avatar src={image} />
            <div className='sidebarChat_info'>
                <h2>{name}</h2>
                <p>{lastChat}</p>
            </div>
        </div>
     </Link>
    ) : (
        <Link to={`/chat/add/`} className="link">
        <div className='sidebarChat'>
            <div className='sidebarChat_info'>
                <h2>Add new chat room</h2>
            </div>
        </div>
     </Link>
    )
}

export default SidebarChat