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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
    setSuccessMessage("")
    const newlist = participants.split(',')
    newlist.forEach(item => newParticipants.push(parseInt(item)))
    if(!newParticipants.includes(parseInt(localStorage.getItem('user')))){
      newParticipants.push(parseInt(localStorage.getItem('user')))
    }
    try {
      const response = await axios.post('http://139.59.50.131:8000/api/chat/', {
        name: roomName,
        participants: newParticipants
      }, {headers: {
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }})
      console.log(response)
      setErrorMessage("")
      setSuccessMessage("Chat room added!")
    } catch(err) {
      console.log(err)
      setErrorMessage("Error. Chat Room could not be added.")
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
        <h2>{successMessage}</h2>
        <h2>{errorMessage}</h2>
    </form>
  )
}

export default NewChatForm;
