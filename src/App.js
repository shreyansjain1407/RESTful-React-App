// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = () => {
    //State is immutable data and cannot be edited directly but
    //setTasks[...tasks, {Do what you need here}]
    const [showAdd, setShowAdd] = useState(false)
    const [tasks, setTasks] = useState([])
    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
        }
        getTasks()
    }, [])

    //Fetch Tasks
    const fetchTasks = async () => {
        const response = await fetch('http://localhost:5000/tasks')
        console.log(response)
        const data = await response.json()

        console.log(data)
        return data
    }

    //Fetch Task
    const fetchTask = async (id) => {
        const response = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await response.json()

        // console.log(data)
        return data
    }

    //Adding a task
    const addTask = async (task) => {
        console.log(task)
        const res = await fetch(`http://localhost:5000/tasks`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })

        const data = await res.json()
        setTasks([...tasks, data])
        // console.log(task)
        // const id = Math.floor(Math.random() * 10000) +1
        // const newTask = {id, ...task}
        // setTasks([...tasks, newTask])
    }

    //Delete Task
    const deleteTask = async (id) => {
        // console.log('delete',id)
        await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})
        setTasks(tasks.filter((task) => task.id !== id))
    }

    //Toggle Reminder
    const setReminder = async (id) => {
        const taskToToggle = await fetchTask(id)
        const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}
        // console.log('setReminder', id)
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        const data = await res.json()
        setTasks(
            tasks.map((task) => task.id === id ?
            { ...task, reminder: !task.reminder}
                : task
            )
        )
    }

    return (
        <div className="container">
            <Header onAdd={() => setShowAdd(!showAdd)} showAdd={showAdd}/>
            {showAdd && (<AddTask onAdd={addTask}/>)}
            {/*The above && operator is used as a ternary operator without an else block*/}
            {tasks.length?
                (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={setReminder} />)
                : ('No Tasks To Show')}
        </div>
    );
}

export default App;
