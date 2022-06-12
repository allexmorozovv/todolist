import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';

export type filterValueType = "all" | "active" | "completed"

function App() {
    let [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: true},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])
    const removeTask = (id: string) => {
        tasks = tasks.filter((el) => el.id !== id)
        setTask(tasks)
    }

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTask([newTask, ...tasks])
    }

    let [filterValue, setFilterValue] = useState("all")

    const changeFilter = (value: filterValueType) => {
        setFilterValue(value)
        console.log(value)
    }

    let filteredTasks = tasks

    if (filterValue === "active") {
        filteredTasks = tasks.filter(el => el.isDone === false)
    }
    if (filterValue === "completed") {
        filteredTasks = tasks.filter(el => el.isDone === true)
    }


    return (
        <div className="App">
            <Todolist title={"Hello"}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />

        </div>
    );
}

export default App;
