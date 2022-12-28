import {AppActionsType, setErrorAC, SetErrorActionType, setStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch<AppActionsType>, error: string) => {
    dispatch(setErrorAC(error))
    dispatch(setStatusAC("failed"))
}
export const handleServerAppError = <T>(dispatch: Dispatch<SetErrorActionType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
}