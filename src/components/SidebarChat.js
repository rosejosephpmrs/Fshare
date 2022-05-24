import { Avatar } from '@mui/material'
import React from 'react'
import '../styles/SidebarChat.css'
import {Link} from 'react-router-dom'

function SidebarChat({name, id, image, lastChat, timestamp}) {
 return  (
     <Link to={`/users/${id}`} className="link">
        <div className='sidebarChat'>
            <Avatar src={image} />
            <div className='sidebarChat_info'>
                <h2>{name}</h2>
                <p>{lastChat}</p>
            </div>
        </div>
     </Link>
     
 )
}

export default SidebarChat