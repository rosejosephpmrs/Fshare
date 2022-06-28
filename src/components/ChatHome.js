
import '../styles/App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React, { useEffect, useState, useCallback } from 'react';
//import CircularProgress from '@mui/material/CircularProgress';
import { getChatRooms } from '../api/Backend';
import axios from 'axios';
import NewChatForm from './NewChatForm';
import '../styles/Chat.css'
import {Link} from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';


function ChatHome() {
  //const [loading, setloading] = useState(false); 
  //const [error, seterror] = useState(false); 
  //const [refresh, setrefresh] = useState(false); 
  const [rooms, setrooms] =useState([])

  const [user, setUser] = useState(localStorage.getItem('user'));

  const [users, setUsers] = useState([])
  const [statusCode, setStatusCode] = useState(null)
  
  // useEffect(()=>{loadRooms()},[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response  = await axios.get('http://139.59.50.131:8000/api/chat/', {headers: {
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }});
        setrooms(response.data)
        console.log("Response", response)
        console.log("data", response.status)

      } catch (error) {
        console.error(error)
        setStatusCode(error.response.status)
        console.log(error.response.status)
        console.log("Status", statusCode)
      }
      // setLoading(false);
    };
    const fetchUsers = async () => {
      try {
        const { data: response } = await axios.get('http://139.59.50.131:8000/api/user/');
        setUsers(response)
        console.log("Response", response)
        console.log(localStorage.getItem('user'))
        console.log(users)
        const currUserName = users.find(isCurrentUser)
        console.log(currUserName)
        setUser(currUserName.username)
      } catch (error) {
        console.error(error)
      }
      // setLoading(false);
    };

    const isCurrentUser = (user) => user.id == localStorage.getItem('user')

    fetchData();
    fetchUsers();

  }, [rooms]);

  // const loadRooms = () =>{
  //   try {
  //     console.log("yo")
  //     const res = getChatRooms()
  //     console.log('response', res.response)
  //   } catch(e) {
  //     console.log(e);
  //   }
  // }

  if (statusCode === 401) {
    return (
      <div className='sidebar' >
        <p>
          You have not logged in or your session has expired..Please <Link to="/login">login</Link> again 
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
            <Route path="/chat/:roomId" element={<Chat rooms={rooms} users={users}/>} />
            <Route path="/" element={<p className="para-chat"> Hello, @{user}! Please select a chat...</p>} />
            <Route path="/chat/add" element={<NewChatForm userprops={users}/>} />
            </Routes>
      </div>
      )}
      
    </div>
  );
}

export default ChatHome;
