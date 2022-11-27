import {FilterValueType, TasksType, TaskType} from "../App";
import {v1} from "uuid";


export const tasksReducer = (state: TasksType, action: TasksActionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            // setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
            return {...state}
        }
        case "ADD-TASK": {
            // let newTasks: TaskType = {id: v1(), title: newTitle, isDone: false}
            // setTasks({...tasks, [todoListId]: [newTasks, ...tasks[todoListId]]})
            return state
        }
        case "CHANGE-TASK-STATUS": {
            // setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === tasksID ? {...t, isDone: newStatus} : t)})
            return state
        }
        case "CHANGE-TASK-FILTER": {
            // setTodolists(todolists.map(tl => tl.id === todoListId ? {...tl, filter: filterValue} : tl))
            return state
        }
        default:
            return state
    }
}

type TasksActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskFilterAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId,
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
export const changeTaskStatusAC = (todoListId: string, tasksID: string, newStatus: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todoListId,
            tasksID,
            newStatus
        }
    } as const
}
export const changeTaskFilterAC = (todoListId: string, filterValue: FilterValueType) => {
    return {
        type: "CHANGE-TASK-FILTER",
        payload: {
            todoListId,
            filterValue
        }
    } as const
}