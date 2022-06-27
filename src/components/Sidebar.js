import React, { useEffect, useState } from 'react';
import '../styles/Sidebar.css';
import {Avatar, IconButton} from '@mui/material'
import MoreVertRounded from '@mui/icons-material/MoreVertRounded'
import {SearchOutlined} from '@mui/icons-material'
import SidebarChat from './SidebarChat';
import ClearIcon from '@mui/icons-material/Clear';
import ShareIcon from '@mui/icons-material/Share';


function Sidebar({rooms}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredRooms, setFilteredRooms] = useState([])

    const filterBySearch = (room) => {
      if (searchTerm == '')
        return room
      else if(room.name.toLowerCase().includes(searchTerm.toLowerCase()))
        return room
    }

    const filterByUser = (rooms) => {
      let filtered = []
      for(let i=0; i<rooms.length; i++){
        console.log("got", rooms[i])
        if(rooms[i].participants.includes(parseInt(localStorage.getItem('user')))){
          console.log("got")
          filtered.push(rooms[i])
        }
      }
      setFilteredRooms(filtered)
    }

    useEffect(() => {
      filterByUser(rooms)}
      ,[filteredRooms])

    return (
        <div className='sidebar'>
          
          <div className='sidebar_header'>
              <div className='sidebar_header_left'>
                  <IconButton>
                    <ShareIcon/>
                  </IconButton>
                  <h2 className='sidebar_appName'>FShare</h2> 
               </div>
               {/* <IconButton>
                <MoreVertRounded />
               </IconButton>  */}
          </div>
          <div className='sidebar_search'>
              <div className='sidebar_searchContainer'>
                <SearchOutlined />
                <input placeholder='Search' type="text" value={searchTerm} onChange={e => {setSearchTerm(e.target.value)}}/>
                <IconButton className='sidebar_searchClear' onClick={()=>setSearchTerm('')}><ClearIcon /></IconButton>
              </div>    
          </div>
          <div className='sidebar_chats'>
                <SidebarChat addNewChat={true} />
                {filteredRooms.filter(filterBySearch).map((room) => (
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