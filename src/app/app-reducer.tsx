export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type  SetStatusActionType = ReturnType<typeof setStatusAC>
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetInitializedActionType = ReturnType<typeof setInitializedAC>

const initialState = {
    isInitialized: false,
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':{
            return {...state, isInitialized: action.value}
        }
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}
export const setErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}
export const setInitializedAC = (value:boolean) => {
    return {
        type: 'APP/SET-INITIALIZED',
        value
    } as const
}

export type AppActionsType = SetStatusActionType | SetErrorActionType|SetInitializedActionType