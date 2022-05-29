
import '../styles/App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React, { useEffect, useState, useCallback } from 'react';
//import CircularProgress from '@mui/material/CircularProgress';
import { getChatRooms } from '../api/Backend';
import axios from 'axios';

function ChatHome() {
  //const [loading, setloading] = useState(false); 
  //const [error, seterror] = useState(false); 
  //const [refresh, setrefresh] = useState(false); 
  const [rooms, setrooms] =useState([])

  const [user, setUser] = useState('name');
  
  // useEffect(()=>{loadRooms()},[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('http://159.65.146.44:8000/api/chat/');
        setrooms(response)
        console.log("Response", response)
      } catch (error) {
        console.error(error)
      }
      // setLoading(false);
    };

    fetchData();
  }, []);

  // const loadRooms = () =>{
  //   try {
  //     console.log("yo")
  //     const res = getChatRooms()
  //     console.log('response', res.response)
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

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
            <Route path="/chat/:roomId" element={<Chat rooms={rooms}/>} />
            <Route path="/" element={<h1> No chat selected </h1>} />
            </Routes>
      </div>
      )}
      
    </div>
  );
}

export default ChatHome;
