import React from 'react';
import '../styles/Sidebar.css';
import {Avatar, IconButton} from '@mui/material'
import MoreVertRounded from '@mui/icons-material/MoreVertRounded'
import {SearchOutlined} from '@mui/icons-material'
import SidebarChat from './SidebarChat';


function Sidebar({users}) {
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
                {users.map((user) => (
                    <SidebarChat 
                        key={user.id}
                        name={user.name}
                        id={user.id}
                        image={user.picture}
                        lastChat={user.lastChat}
                        timestamp={user.latest_timestamp}
                    />
                ))}
          </div>
        </div>
    )
}

export default Sidebar