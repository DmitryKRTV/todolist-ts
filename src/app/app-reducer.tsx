import {AppThunk} from "./store";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "../features/Login/login-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type InitialStateType = {
    status: RequestStatusType,
    error: RequestErrorType,
    initialized: InitializedStatusType,
}

const slice = createSlice({
    name: "app",
    initialState: {
        status: "idle" as RequestStatusType,
        error: null as RequestErrorType,
        initialized: false as InitializedStatusType,
    },
    reducers: {
        setAppError(state, action: PayloadAction<{error: RequestErrorType}>) {
            state.error = action.payload.error
        },
        setAppStatus(state, action:PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppInitialized(state, action:PayloadAction<{initialized: InitializedStatusType}>) {
            state.initialized = action.payload.initialized
        },
    }
})

export const appReducer = slice.reducer

export const {setAppInitialized, setAppStatus, setAppError} = slice.actions

export const isInitializedApp = (): AppThunk => (dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatus({status: "succeeded"}))

            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppInitialized({initialized: true}))
        })
}

export const logOut = (): AppThunk => dispatch => {
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatus({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppInitialized({initialized: true}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })

}

// export const getData = (): AppThunk => dispatch => {
//     instance1.post("/auth/login", {
//         email: "dkorotayev3@gmail.com",
//         password: "123123123",
//         rememberMe: false,
//     })
//         .then(res => {
//             console.log(res)
//         })
//
// }
//
// export const instance1 = axios.create({
//     baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
//     // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
//     withCredentials: true,
// })

// export type InitialStateType = typeof initialState
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitializedStatusType = boolean
export type RequestErrorType = string | null

export type FinalAppActionsType = PayloadAction<{error: RequestErrorType}> |
    PayloadAction<{status: RequestStatusType}> |
    PayloadAction<{initialized: InitializedStatusType}>

// export const appReducer = (state: InitialStateType = initialState, action: FinalAppActionsType): InitialStateType => {
//     switch (action.type) {
//         case "APP/SET-STATUS":
//             return {...state, status: action.status}
//         case "APP/SET-ERROR":
//             return {...state, error: action.error}
//         case "APP/SET-IS-INITIALIZED":
//             return {...state, initialized: action.value}
//         default:
//             return state
//     }
// }

// export const setAppError = (error: RequestErrorType) => ({
//     type: "APP/SET-ERROR",
//     error
// } as const)
//
// export const setAppStatus = (status: RequestStatusType) => ({
//     type: "APP/SET-STATUS",
//     status
// } as const)
//
// export const setAppInitialized = (value: InitializedStatusType) => ({
//     type: "APP/SET-IS-INITIALIZED",
//     value
// } as const)

// export type FinalAppActionsType = ReturnType<typeof setAppError> |
//     ReturnType<typeof setAppStatus> |
//     ReturnType<typeof setAppInitialized>