import {addTodolistACType, removeTodolistACType} from "./todoListsReducer";
import {TasksType, TaskType} from "../App";
import {v1} from "uuid";

const initialState: TasksType = {}

export const tasksReducer = (state = initialState, action: TasksActionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            console.log(state[action.payload.todoListId])
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            let newTasks: TaskType = {id: v1(), title: action.payload.newTitle, isDone: false}
            return {...state, [action.payload.todoListId]: [newTasks, ...state[action.payload.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.tasksID ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.newTitle
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        default:
            return state
    }
}

type TasksActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | addTodolistACType
    | removeTodolistACType

export const removeTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todoListId,
            taskId
        }
    } as const
}

export const addTaskAC = (todoListId: string, newTitle: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todoListId,
            newTitle
        }
    } as const
}
export const changeTaskStatusAC = (todoListId: string, tasksID: string, isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todoListId,
            tasksID,
            isDone
        }
    } as const
}
export const changeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todoListId,
            taskId,
            newTitle
        }
    } as const
}