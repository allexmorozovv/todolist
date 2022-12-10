import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {Input} from "./components/Input";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";

export type FilterValueType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {


    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])

    
    let [tasks, setTasks] = useState<TasksType>({
        [todoListId_1]: [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        [todoListId_2]: [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
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
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filterValue} : tl))

    }
    const removeTodolist = (todolistId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }
    const addTodolist = (newTodolistTitle: string) => {
        const newTodolistId = v1()
        const newTodolist: TodoListType = {id: newTodolistId, title: newTodolistTitle, filter: 'all'}
        setTodoLists([newTodolist, ...todoLists])
        setTasks({...tasks, [newTodolistId]: []})

    }

    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
        // console.log(newTitle)
    }

    const editTodolist = (todolistId: string, newTodolistTitle: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistId ? {...tl, title: newTodolistTitle} : tl))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <Input callBack={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let filteredTasks = tasks[tl.id]
                            if (tl.filter === "active") {
                                filteredTasks = tasks[tl.id].filter(el => el.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                filteredTasks = tasks[tl.id].filter(el => el.isDone === true)
                            }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
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

                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;
