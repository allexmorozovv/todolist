import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from "./state/todoListsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasksReducer";

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

function AppWithReducer() {


    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'}
    ])


    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
        let action = removeTaskAC(todoListId, taskId)
        dispatchTasks(action)
    }
    const addTask = (todoListId: string, newTitle: string) => {
        let action = addTaskAC(todoListId, newTitle)
        dispatchTasks(action)
    }
    const changeCheckBox = (todoListId: string, tasksID: string, newStatus: boolean) => {
        let action = changeTaskStatusAC(todoListId, tasksID, newStatus)
        dispatchTasks(action)
    }
    const editTask = (todolistId: string, taskId: string, newTitle: string) => {
        let action = changeTaskTitleAC(todolistId, taskId, newTitle)
        dispatchTasks(action)
    }
    const changeFilter = (todoListId: string, filterValue: FilterValueType) => {
        let action = changeTodolistFilterAC(todoListId, filterValue)
        dispatchTodoLists(action)
    }
    const removeTodolist = (todolistId: string) => {
        let action = removeTodolistAC(todolistId)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const addTodolist = (newTodolistTitle: string) => {
        let action = addTodolistAC(newTodolistTitle)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const editTodolist = (todolistId: string, newTodolistTitle: string) => {
        dispatchTodoLists(changeTodolistTitleAC(todolistId, newTodolistTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm callBack={addTodolist}/>
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

export default AppWithReducer;
