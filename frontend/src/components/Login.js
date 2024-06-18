import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();  // Initialize useNavigate

  const validate = () => {
    let errors = {};

    if (!username) {
        errors.username = "Username is required";
    }

    if (!password) {
        errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0){
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setMessage('User logged in successfully!');
      navigate('/');  // Redirect to dashboard after successful login
      window.location.reload(); // Odświeżenie strony
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <div>
      {!props.isLoggedin ? (
        <>
          <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                  <div className="card text-black" style={{ borderRadius: '25px' }}>
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>

                          <form onSubmit={handleSubmit} className="mx-1 mx-md-4">

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  id="form3Example1c"
                                  className="form-control"
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example1c">Username</label><br/>
                                {errors.username && <span className="text-danger">{errors.username}</span>}
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                <input
                                  type="password"
                                  id="form3Example4c"
                                  className="form-control"
                                  value={password} 
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example4c">Password</label><br/>
                                {errors.password && <span className="text-danger">{errors.password}</span>}
                              </div>
                            </div>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Login</button>
                            </div>

                          </form>
                        </div>
                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                          <img src="https://media.istockphoto.com/id/1329003941/photo/agenda-organize-with-color-coding-sticky-for-time-management.jpg?s=612x612&w=0&k=20&c=MXeOW0DlqYJQQ_bQmntR5jVhW5iP5rJ0zXxLrK10BW4="
                            className="img-fluid" alt="A notepad"/>
                        </div>
                      </div>
                      {message && <p>{message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
      </>
    ) : (
      <>
        <div>
          <h2>Jesteś już zalogowany... jak się tu dostałeś?</h2>
        </div>
      </>
    )}
    </div>
  );
}

export default Login;