import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValueType = "all" | "active" | "completed"

export type TodoListsType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListsId_1 = v1()
    const todoListsId_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodoListsType>>([
        {id: todoListsId_1, title: 'What to learn', filter: 'all'},
        {id: todoListsId_2, title: 'What to buy', filter: 'all'}
    ])

    // let [tasks, setTasks] = useState<TasksType>({
    //     [todoListsId_1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: true},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false}
    //     ],
    //     [todoListsId_2]: [
    //         {id: v1(), title: "Beer", isDone: true},
    //         {id: v1(), title: "Fish", isDone: true},
    //         {id: v1(), title: "Chips", isDone: true}
    //     ]
    // })

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);


    const removeTask = (todoListId: string, id: string) => {
        // let luckyTasks = tasks[todoListId].filter(t => t.id !== id)
        // setTasks({...tasks})
    }

    const addTask = (todoListId: string, newTitle: string) => {
        // const newTask = {id: v1(), title: newTitle, isDone: false}
        // setTask([newTask, ...tasks])
    }
    const changeCheckBox = (todoListId: string, tasksID: string, newStatus: boolean) => {
        // setTask(tasks.map(t => t.id === tasksID ? {...t, isDone: newStatus} : t))
    }

    // const [filter, setFilter] = useState<FilterValueType>("all")

    const changeFilter = (todoListId: string, filterValue: FilterValueType) => {
        setTodolists(todolists.map(tl => tl.id === todoListId ? {...tl, filter: filterValue} : tl))

    }
    // const removeTodolist = (todolistId:string) => {
    //     setTodolists(todolists.filter(tl=>tl.id!==todolistId))
    // }


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let filteredTasks = tasks
                    if (tl.filter === "active") {
                        filteredTasks = tasks.filter(el => el.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        filteredTasks = tasks.filter(el => el.isDone === true)
                    }
                    return (
                        <Todolist key={tl.id}
                                  todolistId={tl.id}
                                  title={tl.title}
                                  tasks={filteredTasks}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeCheckBox={changeCheckBox}
                                  filter={tl.filter}
                                  // removeTodolist={removeTodolist}
                        />)
                })
            }


        </div>
    );
}

export default App;
