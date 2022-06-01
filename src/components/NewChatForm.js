import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'
import '../styles/ChatForm.css'

function NewChatForm(userprops){

  const [users, setUsers] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [roomName, setRoomName] = useState([]);

  console.log("passed", userprops)

  const fetchUsers = async() => {
    try {
      const {data: response} = await axios.get('http://159.65.146.44:8000/api/user/')
      // console.log(response)
      setUsers(response)
      // console.log(users)
      // console.log("here", response)
      let list = []
      users.forEach(user => {list.push({'label': user.username, 'value': user.id})})
      setUsersList(list)
    }
    catch(err){
      console.log(err)
    }
  }

  const  handleOnchange  =  val  => {
    setParticipants(val)
    // console.log(typeof(participants), participants)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newParticipants = []
    const newlist = participants.split(',')
    newlist.forEach(item => newParticipants.push(parseInt(item)))
    try {
      const response = await axios.post('/api/chat/', {
        room_name: roomName,
        participants: newParticipants
      })
      console.log(response)
    } catch(err) {
      console.log(err)
    }
  }
  
  useEffect(()=>{
    let list = []
    console.log("yo")
    userprops.userprops.forEach(user => {list.push({'label': user.username, 'value': user.id})})
    setUsersList(list)
  }, [userprops])

  return(
    <form onSubmit={handleSubmit} className="chat form-section">
        <h1> Create a chat room </h1>
        <input placeholder="Enter name for chat room" value={roomName} onChange={(e) => setRoomName(e.target.value)} className="input-line"/>
        <label className="label-text">
          Pick participants for your chat room:
          </label>
          <MultiSelect
            onChange={handleOnchange}
            options={usersList}
            className=".input-line"
          />
        <input type="submit" value="Create Room" className="submit-btn"/>
    </form>
  )
}

export default NewChatForm;
