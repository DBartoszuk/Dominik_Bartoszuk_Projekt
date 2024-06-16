import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = (props) => {

    const [tasks, setTasks] = useState([]);

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

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

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
                                    style={{backgroundColor:'#913030', color:"white", border:'none', borderRadius: '15%'}}
                                    onClick={() => deleteTask(task._id)}
                                >
                                    Delete task
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                By: Dominik Bartoszuk
            </div>
        </div>
    );
};

export default HomePage;