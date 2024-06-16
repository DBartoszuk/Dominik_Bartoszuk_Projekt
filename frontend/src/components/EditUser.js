import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EditUser(props){
    const [newPassword, setNewPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.put("http://localhost:8080/api/tasks", {newUsername, newPassword});
            navigate('/');
            //window.location.reload();
        } catch(errors){
            console.log(errors);
            setMessage("Error adding a new task")
        }
    }

    return(
        <div>
          <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="card text-black" style={{ borderRadius: '25px' }}>
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">

                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Change your username or password</p>

                          <form onSubmit={handleSubmit} className="mx-1 mx-md-4">

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  id="form3Example1c"
                                  className="form-control"
                                  value={newUsername}
                                  onChange={(e) => setNewUsername(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example1c">Username</label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                <input
                                  type="password"
                                  id="form3Example2c"
                                  className="form-control"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example2c">Password</label>
                              </div>
                            </div>
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Save Changes</button>
                            </div>
                          </form>
                        </div>
                      </div>
                </div>
              </div>
            </div>
            {message && <p>{message}</p>}
          </section>
        </div>
    );
};

export default EditUser;