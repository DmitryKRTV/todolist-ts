const initialState = {
    status: "loading" as RequestStatusType,
    error: null as RequestErrorType
}

export const appReducer = (state: InitialStateType = initialState, action: FinalAppActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}


export type InitialStateType = typeof initialState
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type RequestErrorType = string | null

export const setError = (error: RequestErrorType) => ({
    type: "APP/SET-ERROR",
    error
} as const)

export const setStatus = (status: RequestStatusType) => ({
    type: "APP/SET-STATUS",
    status
} as const)

export type FinalAppActionsType = ReturnType<typeof setError> |
    ReturnType<typeof setStatus>