import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type filterValueType = "All" | "Active" | "Completed"

function App() {
    let [tasks, setTask] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: true},
        {id: 4, title: "ReactJS", isDone: false}
    ])
    const removeTask = (id: number) => {
        tasks = tasks.filter((el) => el.id !== id)
        setTask(tasks)

    }

    let [filterValue, setFilterValue] = useState("All")

    const changeFilter = (value: filterValueType) => {
        setFilterValue(value)
        console.log(value)
    }

    let filteredTasks = tasks

    if (filterValue === "Active") {
        filteredTasks = tasks.filter(el => el.isDone === false)
    }
    if (filterValue === "Completed") {
        filteredTasks = tasks.filter(el => el.isDone === true)
    }


    return (
        <div className="App">
            <Todolist title={"Hello"}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
