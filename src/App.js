import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useEffect, useState } from 'react';

function App() {
  useEffect(() => {
    localStorage.clear();
  }, [])
  const [alert, setAlert] = useState(null);
  const showAlert = (messege, type) => {
    setAlert({
      msg: messege,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
    <NoteState>
      <Router>
        <Navbar></Navbar>
        <Alert alert = {alert}></Alert>
        <Routes>
          <Route exact path="/about" element={ <About />} />
          <Route exact path="/" element={<Home showAlert ={showAlert} />} />
          <Route exact path="/login" element={<Login showAlert = {showAlert}></Login>} />
            <Route exact path="/signup" element={<SignUp showAlert={showAlert}></SignUp>} />
        </Routes>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
