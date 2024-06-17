import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import AddTask from './components/AddTask';
import EditUser from './components/EditUser';
import { useEffect, useState } from 'react';
import {Route, Routes, Link, useNavigate} from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
//import axios from 'axios';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkToken()) {
      setIsLoggedIn(true);
    }
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem('token');
    //console.log("Sprawdzanie tokenu", !!token);
    return !!token;
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    console.log("Wylogowanie");
    navigate('/');
  };

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <FontAwesomeIcon icon={faHome} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/">HomePage</Nav.Link>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">HomePage</Nav.Link>
                  <Nav.Link as={Link} to="/add-task">Add Task</Nav.Link>
                  <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<HomePage checkToken={checkToken} />} />
        <Route path="/add-task" element={<AddTask/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
