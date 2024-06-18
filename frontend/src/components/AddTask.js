import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function AddTask(props){
    const [taskname, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(1);
    const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const userId = props.userId;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/api/tasks", {taskname, description, priority, date, userId});
            //console.log("Wszystko poszło fajnie", response);
            setMessage('Task added successfully!');
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

                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Add new task</p>

                          <form onSubmit={handleSubmit} className="mx-1 mx-md-4">

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  id="form3Example1c"
                                  className="form-control"
                                  value={taskname}
                                  onChange={(e) => setTaskName(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example1c">Task</label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  id="form3Example2c"
                                  className="form-control"
                                  value={description}
                                  onChange={(e) => setDescription(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example2c">Description</label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                {/* <input
                                  type="number"
                                  id="form3Example4c"
                                  className="form-control"
                                  value={priority} 
                                  onChange={(e) => setPriority(e.target.value)}
                                /> */}
                                <select
                                    id="form3Example4c"
                                    className="form-select"
                                    value={priority} 
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                                <label className="form-label" htmlFor="form3Example4c">Priority</label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                <input
                                  type="date"
                                  id="form3Example5c"
                                  className="form-control"
                                  value={date} 
                                  onChange={(e) => setDate(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example5c">Date</label>
                              </div>
                            </div>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Add Task</button>
                            </div>
                          </form>
                        </div>
                      </div>
                      {message && <p>{message}</p>}
                </div>
              </div>
            </div>
          </section>
        </div>
    );
};

export default AddTask;