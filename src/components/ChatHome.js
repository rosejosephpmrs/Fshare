
import '../styles/App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import React, { useEffect, useState, useCallback } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function ChatHome() {
  const [loading, setloading] = useState(false); 
  const [error, seterror] = useState(false); 
  const [refresh, setrefresh] = useState(false); 
  const [users, setusers] =useState([])

  const [user, setUser] = useState('name');
  
  const loadUsers = useCallback(async () => {
        setrefresh(true);
        seterror(null);
        try {
            const res = await fetch("https://mocki.io/v1/a619c441-b339-46a0-944e-1b5b99da8bce");
            if (!res.ok) {
                throw new Error("Something went wrong...");
            }
            const resData = await res.json();
            console.log(resData)
            setusers(resData)
        } catch(e){
            seterror(e);
        }
        setrefresh(false);
  }, [setrefresh, seterror]);

  useEffect(() => {
    setloading(false);
    loadUsers().then(() => {
      setrefresh(false);
      
    });
  }, [loadUsers, setloading]);

  if (loading) {
    return (
      <div className='sidebar_chatLoad'>
        <CircularProgress size="large" color="#075E54" />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    <div className='sidebar_chatLoad'>
      <p>An Error Occured....Try AGain?</p>
      <button title="Try Again" onPress={loadUsers} color="#075E54" />
    </div>;
  }

  if (!loading && users.length === 0) {
    return (
      <div className='sidebar' >
        <p>
          Sorry No Users Available.. 
        </p>
      </div>
    );
  }

  return (
    <div className="app">
      {!user ? ( <h1>LOGIN</h1> ) :
      (
        <div className='app_body'>
            <Sidebar users={users}/>
            <Routes>
            <Route path="/users/:userId" element={<Chat users={users}/>} />
            <Route path="/" element={<div>Home Screen</div>} />
            </Routes>
      </div>
      )}
      
    </div>
  );
}

export default ChatHome;
