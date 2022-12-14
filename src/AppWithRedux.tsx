import {addTodolistAC,} from "./state/todoListsReducer";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import TodolistWithRedux from "./TodolistWithRedux";
import {AppRootStateType} from "./state/store";
import {AddItemForm} from "./components/AddItemForm";
import React, {useCallback} from 'react';
import './App.css';

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

function AppWithRedux() {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const dispatch = useDispatch()

    const addTodolist = useCallback ((newTodolistTitle: string) => {
        dispatch(addTodolistAC(newTodolistTitle))
    },[dispatch])

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
                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                    <TodolistWithRedux todolist={tl}/>
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
