import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import {Input} from "./components/Input";
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import TodolistWithRedux from "./TodolistWithRedux";

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

function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    // const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
    const dispatch = useDispatch()

    // const removeTask = (todoListId: string, taskId: string) => {
    //     let action = removeTaskAC(todoListId, taskId)
    //     dispatch(action)
    // }
    // const addTask = (todoListId: string, newTitle: string) => {
    //     let action = addTaskAC(todoListId, newTitle)
    //     dispatch(action)
    // }
    // const changeCheckBox = (todoListId: string, tasksID: string, newStatus: boolean) => {
    //     let action = changeTaskStatusAC(todoListId, tasksID, newStatus)
    //     dispatch(action)
    // }
    // const editTask = (todolistId: string, taskId: string, newTitle: string) => {
    //     dispatch(changeTaskTitleAC(todolistId, taskId, newTitle))
    // }
    // const changeFilter = (todoListId: string, filterValue: FilterValueType) => {
    //     dispatch(changeTodolistFilterAC(todoListId, filterValue))
    // }
    // const removeTodolist = (todolistId: string) => {
    //     dispatch(removeTodolistAC(todolistId))
    // }
    // const editTodolist = (todolistId: string, newTodolistTitle: string) => {
    //     dispatch(changeTodolistTitleAC(todolistId, newTodolistTitle))
    // }

    const addTodolist = (newTodolistTitle: string) => {
        dispatch(addTodolistAC(newTodolistTitle))
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
                            // let filteredTasks = tasks[tl.id]
                            // let allTodolistTasks = filteredTasks

                            // if (tl.filter === "active") {
                            //     allTodolistTasks = filteredTasks.filter(el => el.isDone === false)
                            // }
                            // if (tl.filter === "completed") {
                            //     allTodolistTasks = filteredTasks.filter(el => el.isDone === true)
                            // }
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodolistWithRedux
                                                       todolist={tl}
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

export default AppWithRedux;
