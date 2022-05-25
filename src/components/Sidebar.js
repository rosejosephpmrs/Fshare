import React from 'react';
import '../styles/Sidebar.css';
import {Avatar, IconButton} from '@mui/material'
import MoreVertRounded from '@mui/icons-material/MoreVertRounded'
import {SearchOutlined} from '@mui/icons-material'
import SidebarChat from './SidebarChat';


function Sidebar({rooms}) {
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
                <input placeholder='Search' type="text" />
              </div>    
          </div>
          <div className='sidebar_chats'>
                <SidebarChat addNewChat={true} />
                {rooms.map((room) => (
                    <SidebarChat 
                        key={room.id}
                        name={room.name}
                        id={room.id}
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