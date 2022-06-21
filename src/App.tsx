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

    const changeCheckBox = (tasksID: string, value: boolean) => {
        setTask(tasks.map(el => el.id === tasksID ? {...el, isDone: value} : el))
    }

    const removeTask = (id: string) => {
        tasks = tasks.filter((el) => el.id !== id)
        setTask(tasks)
    }

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTask([newTask, ...tasks])
    }

    let [filter, setFilter] = useState<filterValueType>("all")

    const changeFilter = (value: filterValueType) => {
        setFilter(value)
        console.log(value)
    }

    let filteredTasks = tasks

    if (filter=== "active") {
        filteredTasks = tasks.filter(el => el.isDone === false)
    }
    if (filter === "completed") {
        filteredTasks = tasks.filter(el => el.isDone === true)
    }


    return (
        <div className="App">
            <Todolist title={"Hello"}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeCheckBox={changeCheckBox}
                      filter={filter}
            />

        </div>
    );
}

export default App;
