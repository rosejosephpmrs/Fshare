import React, { useState } from 'react';
import '../styles/Sidebar.css';
import {Avatar, IconButton} from '@mui/material'
import MoreVertRounded from '@mui/icons-material/MoreVertRounded'
import {SearchOutlined} from '@mui/icons-material'
import SidebarChat from './SidebarChat';


function Sidebar({rooms}) {
    const [searchTerm, setSearchTerm] = useState('')

    const filterBySearch = (room) => {
      if (searchTerm == '')
        return room
      else if(room.name.toLowerCase().includes(searchTerm.toLowerCase()))
        return room
    }
    return (
        <div className='sidebar'>
          
          <div className='sidebar_header'>
              <div className='sidebar_header_left'>
                  <IconButton>
                    <Avatar />
                  </IconButton>
                  <h2 className='sidebar_appName'>FShare</h2> 
               </div>
               <IconButton>
                <MoreVertRounded />
               </IconButton> 
          </div>
          <div className='sidebar_search'>
              <div className='sidebar_searchContainer'>
                <SearchOutlined />
                <input placeholder='Search' type="text" onChange={e => {setSearchTerm(e.target.value)}}/>
              </div>    
          </div>
          <div className='sidebar_chats'>
                <SidebarChat addNewChat={true} />
                {rooms.filter(filterBySearch).map((room) => (
                    <SidebarChat 
                        key={room.room_id}
                        name={room.name}
                        id={room.room_id}
                        image={room.picture}
                        lastChat={room.lastChat}
                        timestamp={room.latest_timestamp}
                    />
                ))}
          </div>
        </div>
    )
}

export default Sidebar