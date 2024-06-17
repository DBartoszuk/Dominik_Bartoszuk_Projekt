import React, { useState } from "react";
import axios from "axios";

const EditTask = (props) => {
    const [editTaskName, setEditTaskName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editPriority, setEditPriority] = useState('');
    const [editDate, setEditDate] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateTask({
                _id: props.id,
                taskname: editTaskName,
                description: editDescription,
                priority: editPriority,
                date: editDate
            });
        } catch (error) {
            console.log('Error updating task:', error);
            setMessage('Error updating task');
        }
    };

    const updateTask = async (taskData) => {
        try {
            const response = await axios.put('http://localhost:8080/api/tasks', taskData);
            console.log(response.data);
            setMessage('Task updated successfully');
            // Dodaj dodatkową logikę po aktualizacji zadania, np. powrót do listy zadań
        } catch (error) {
            console.error('Error updating task:', error);
            setMessage('Error updating task');
        }
    };

    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="card text-black" style={{ borderRadius: '25px' }}>
                    <div className="card-body p-md-5">
                      <div className="row justify-content-center">

                          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Edit task</p>

                          <form onSubmit={handleSubmit} className="mx-1 mx-md-4">

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                <input
                                  type="text"
                                  id="form3Example1c"
                                  className="form-control"
                                  value={editTaskName}
                                  onChange={(e) => setEditTaskName(e.target.value)}
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
                                  value={editDescription}
                                  onChange={(e) => setEditDescription(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example2c">Description</label>
                              </div>
                            </div>

                            <div className="d-flex flex-row align-items-center mb-4">
                              <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                <select
                                    id="form3Example4c"
                                    className="form-select"
                                    value={editPriority} 
                                    onChange={(e) => setEditPriority(e.target.value)}
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
                                  value={editDate} 
                                  onChange={(e) => setEditDate(e.target.value)}
                                />
                                <label className="form-label" htmlFor="form3Example5c">Date</label>
                              </div>
                            </div>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Update</button>
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

export default EditTask;
