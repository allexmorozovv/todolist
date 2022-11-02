import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {Input} from "./components/Input";

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

    let [tasks, setTasks] = useState<TasksType>({
        [todoListsId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: true},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todoListsId_2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Chips", isDone: false}
        ]
    })

    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }

    const addTask = (todoListId: string, newTitle: string) => {
        let newTasks: TaskType = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todoListId]: [newTasks, ...tasks[todoListId]]})
    }
    const changeCheckBox = (todoListId: string, tasksID: string, newStatus: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === tasksID ? {...t, isDone: newStatus} : t)})
    }
    const changeFilter = (todoListId: string, filterValue: FilterValueType) => {
        setTodolists(todolists.map(tl => tl.id === todoListId ? {...tl, filter: filterValue} : tl))

    }
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (newTodolistTitle: string) => {
        const newTodolistId = v1()
        const newTodolist: TodoListsType = {id: newTodolistId, title: newTodolistTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: []})

    }

    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
        // console.log(newTitle)
    }

    const editTodolist = (todolistId: string, newTodolistTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTodolistTitle} : tl))
    }


    return (
        <div className="App">
            <Input callBack={addTodolist}/>
            {
                todolists.map(tl => {
                    let filteredTasks = tasks[tl.id]
                    if (tl.filter === "active") {
                        filteredTasks = tasks[tl.id].filter(el => el.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        filteredTasks = tasks[tl.id].filter(el => el.isDone === true)
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
                                  removeTodolist={removeTodolist}
                                  editTask={editTask}
                                  editTodolist={editTodolist}

                        />)
                })
            }


        </div>
    );
}

export default App;
