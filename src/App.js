// import logo from './logo.svg';
// import './App.css';
import { useState } from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

const App = () => {
    //State is immutable data and cannot be edited directly but
    //setTasks[...tasks, {Do what you need here}]
    const [showAdd, setShowAdd] = useState(false)
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'Feb 5th at 2:30PM',
            reminder: true,
        },
        {
            id: 2,
            text: 'Meeting at School',
            day: 'Feb 6th at 2:30PM',
            reminder: true,
        },
        {
            id: 3,
            text: 'Shopping',
            day: 'Feb 5th at 5:30PM',
            reminder: false,
        },
    ])

    //Adding a task
    const addTask = (task) => {
        // console.log(task)
        const id = Math.floor(Math.random() * 10000) +1
        const newTask = {id, ...task}
        setTasks([...tasks, newTask])
    }

    //Delete Task
    const deleteTask = (id) => {
        // console.log('delete',id)
        setTasks(tasks.filter((task) => task.id !== id))
    }

    //Toggle Reminder
    const setReminder = (id) => {
        // console.log('setReminder', id)
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
            {tasks.length?
                (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={setReminder} />)
                : ('No Tasks To Show')}
        </div>
    );
}

export default App;
