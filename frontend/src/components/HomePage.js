import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = (props) => {

    const [tasks, setTasks] = useState([]);
    const [taskEditting, setTaskEditting] = useState(false);
    const [currentID, setCurrentID] = useState(null);
    const [editTaskName, setEditTaskName] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editPriority, setEditPriority] = useState('');
    const [editDate, setEditDate] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete('http://localhost:8080/api/tasks', {
                data: { id } // Przekazanie ID zadania w ciele żądania
            });
            console.log(response.data);
    
            // Usunięcie zadania z listy po udanym usunięciu z bazy danych
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const validate = () => {
        let errors = {};
    
        if (!editTaskName) {
            errors.taskName = "Task name is required";
        }
    
        if (!editDescription) {
            errors.description = "Description is required";
        }
    
        if (!editPriority) {
            errors.priority = "Priority is required";
        }
    
        if (!editDate) {
            errors.date = "Date is required";
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
            const response = await axios.put(`http://localhost:8080/api/tasks/${currentID}`, {
                id: currentID,
                taskname: editTaskName,
                description: editDescription,
                priority: editPriority,
                date: editDate});
            console.log(response.data);
            setMessage('Task updated successfully');
            setTaskEditting(false);
            fetchTasks();
        } catch (error) {
            console.log('Error updating task:', error);
            setMessage('Error updating task');
        }
    };

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        if(props.checkToken()) {
            fetchTasks();
        }
    }, [props]);

    return(
        <div className="container mt-5">
            <h2>Home Page</h2>
            {!props.checkToken() ? (
                <>
                    <div>
                        This is the Home Page of an application designed to help with organizing tasks
                        <p>Please sign in to use this web application</p>
                    </div>
                </>
            ):(
                <div>
                    {!taskEditting ? (
                        <>
                            Welcome, welcome and enjoy the benefits of using this web application
                            <h4>Your Tasks:</h4>
                            <ul style={{ listStyleType: 'none', padding: '5px', backgroundColor: '#cdf5c9'}}>
                                {tasks.map((task, index) => (
                                    <li style={{padding: '5px', border: 'solid, black 2px'}} key={task._id}>
                                        <strong>Task:</strong> {task.taskname}<br/>
                                        <strong>Description:</strong> {task.description}<br/>
                                        <strong>Priority:</strong> {task.priority}<br/>
                                        <strong>Date:</strong> {new Date(task.date).toLocaleDateString()}<br/>
                                        <button 
                                            style={{backgroundColor:'#913030', color:"white", border:'none', borderRadius: '15%', marginRight: '10px'}}
                                            onClick={() => deleteTask(task._id)}
                                        >
                                            Delete task
                                        </button>
                                        <button 
                                                style={{backgroundColor:'#306b91', color:"white", border:'none', borderRadius: '15%'}}
                                                onClick={() => {
                                                    setTaskEditting(true);
                                                    setCurrentID(task._id);
                                                    setEditTaskName(task.taskname);
                                                    setEditDescription(task.description);
                                                    setEditPriority(task.priority);
                                                    setEditDate(new Date(task.date).toLocaleDateString());
                                                }}
                                            >
                                                Edit task
                                            </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    ):(
                        <>
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
                                {errors.taskName && <span className="text-danger">{errors.taskName}</span>}
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
                                {errors.description && <span className="text-danger">{errors.description}</span>}
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
                                {errors.priority && <span className="text-danger">{errors.priority}</span>}
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
                                {errors.date && <span className="text-danger">{errors.date}</span>}
                              </div>
                            </div>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Update</button>
                            </div>
                          </form>
                        </div>
                      </div>
                      {message && <p>{message}</p>}
                </div>
              </div>
            </div>
          </section>
                        </>
                    )}
                </div>
            )}
            <div>
                By: Dominik Bartoszuk
            </div>
        </div>
    );
};

export default HomePage;