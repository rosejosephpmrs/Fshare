import { useEffect } from "react";
import {Link} from "react-router-dom"

const Logout = () => {

  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },[])

  return(
    <p>You have successfully logged out. Click here to <Link to="/login">login</Link> again</p>
  )
}

export default Logout;