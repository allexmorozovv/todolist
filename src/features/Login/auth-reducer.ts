import {Dispatch} from 'redux'
import {SetErrorActionType, setStatusAC, SetStatusActionType} from '../../app/app-reducer'
import {authAPI, LoginType, RESULT_CODE, TaskType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {addTaskAC} from "../TodolistsList/tasks-reducer";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetStatusActionType | SetErrorActionType