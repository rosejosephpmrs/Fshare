
import '../styles/App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React, { useEffect, useState, useCallback } from 'react';
//import CircularProgress from '@mui/material/CircularProgress';
import { getChatRooms } from '../api/Backend';

function ChatHome() {
  //const [loading, setloading] = useState(false); 
  //const [error, seterror] = useState(false); 
  //const [refresh, setrefresh] = useState(false); 
  const [rooms, setrooms] =useState([])

  const [user, setUser] = useState('name');
  
  useEffect(()=>{loadRooms()},[])

  const loadRooms = () =>{
    try {
      const res = getChatRooms()
      console.log(res)
    } catch(e) {
      console.log(e);
    }
  }

  if (rooms.length === 0) {
    return (
      <div className='sidebar' >
        <p>
          Sorry No Rooms Available.. 
        </p>
      </div>
    );
  }

  return (
    <div className="app">
      {!user ? ( <h1>LOGIN</h1> ) :
      (
        <div className='app_body'>
            <Sidebar rooms={rooms}/>
            <Routes>
            <Route path="/rooms/:roomId" element={<Chat rooms={rooms}/>} />
            <Route path="/" element={<div>Home Screen</div>} />
            </Routes>
      </div>
      )}
      
    </div>
  );
}

export default ChatHome;