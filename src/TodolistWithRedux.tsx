import React, {ChangeEvent, FC} from 'react';
import {TasksType, TaskType, TodoListType} from "./AppWithRedux";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Input} from "./components/Input";
import styles from "./Todolist.module.css";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todoListsReducer";

export type TodolistWithReduxType = {
    todolist: TodoListType
}

const TodolistWithRedux: FC<TodolistWithReduxType> = ({todolist}) => {

    const {id, title, filter} = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()


    const removeTodolistHandler = () => dispatch(removeTodolistAC(id))

    const editTodolistTitleHandler = (newTitle: string) => dispatch(changeTodolistTitleAC(id, newTitle))

    const addTaskHandler = (newTitle: string) => dispatch(addTaskAC(id, newTitle))

    const allChangeFilterHandler = () => dispatch(changeTodolistFilterAC(id, 'all'))

    const activeChangeFilterHandler = () => dispatch(changeTodolistFilterAC(id, 'active'))

    const completedChangeFilterHandler = () => dispatch(changeTodolistFilterAC(id, 'completed'))


    return (
        <div>
            <h3>
                <EditableSpan title={title} callback={editTodolistTitleHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>

            <Input callBack={addTaskHandler}/>

            <ul>
                {
                    tasks.map((task, index) => {
                        const removeTaskHandler = () => dispatch(removeTaskAC(id, task.id))
                        const editTaskHandler = (newTitle: string) => dispatch(changeTaskTitleAC(id, task.id, newTitle))
                        const changeCheckBoxHandler = () => dispatch(changeTaskStatusAC(id, task.id, task.isDone))


                        if (filter === "active") {
                            tasks = tasks.filter(el => el.isDone === false)
                        }
                        if (filter === "completed") {
                            tasks = tasks.filter(el => el.isDone === true)
                        }

                        return (<li key={task.id} className={task.isDone ? styles.isDone : ''}>
                            <IconButton onClick={removeTaskHandler}>
                                <DeleteIcon/>
                            </IconButton>
                            <Checkbox defaultChecked checked={task.isDone} onChange={changeCheckBoxHandler}/>
                            <EditableSpan title={task.title} callback={editTaskHandler}/>
                        </li>)
                    })
                }
            </ul>
            <div>

                <Button color={"success"} variant={filter === 'all' ? "contained" : "outlined"}
                        onClick={allChangeFilterHandler}>All</Button>
                <Button color={"error"} variant={filter === 'active' ? "contained" : "outlined"}
                        onClick={activeChangeFilterHandler}>Active</Button>
                <Button color={"secondary"} variant={filter === 'completed' ? "contained" : "outlined"}
                        onClick={completedChangeFilterHandler}>Completed</Button>
            </div>
        </div>
    )
};

export default TodolistWithRedux;