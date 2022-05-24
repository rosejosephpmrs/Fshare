import Register from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import ChatHome from './components/ChatHome';



function App() {
	return (
		<main className="App">
			<Router>
				<Routes>
					<Route path="/register" exact element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="*" element={<ChatHome />} />
				</Routes>
			</Router>
		</main>
	);
}

export default App;
