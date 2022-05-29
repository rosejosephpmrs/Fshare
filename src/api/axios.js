import axios from 'axios';

export default axios.create({
    // baseURL: 'https://fshare-backend.malavikasmenon.repl.co/api',
    baseURL: 'http://localhost:8000/api'
});