import {FilterValueType, TasksType, TaskType} from "../App";
import {v1} from "uuid";


export const tasksReducer = (state: TasksType, action: TasksActionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            console.log(state[action.payload.todoListId])
            // setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            let newTasks: TaskType = {id: v1(), title: action.payload.newTitle, isDone: false}
            // setTasks({...tasks, [todoListId]: [newTasks, ...tasks[todoListId]]})
            return {...state,[action.payload.todoListId]:[newTasks,...state[action.payload.todoListId]]}
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