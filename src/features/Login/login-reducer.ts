import {AppThunk} from "../../app/store";
import {setAppStatus} from "../../app/app-reducer";
import {authAPI, FieldErrorType, LoginParamsType, todolistAPI} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

type InitialStateType = typeof slice.getInitialState

export const loginMe = createAsyncThunk<{isLoggedIn: boolean}, { data: LoginParamsType }, {rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType>}}>('tasks/deleteTask',  async (param: {data: LoginParamsType}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: "loading"}))
    try {
        const res = await authAPI.login(param.data)
        if(res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: "succeeded"}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            thunkAPI.dispatch(setAppStatus({status: "failed"}))
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(error, thunkAPI.dispatch)
        thunkAPI.dispatch(setAppStatus({status: "failed"}))
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

const slice = createSlice({
    name: "login",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn =  action.payload.value
        },
    },
    extraReducers: builder =>   {
        builder.addCase(loginMe.fulfilled, (state, action) => {
            state.isLoggedIn =  action.payload.isLoggedIn
        })
    }
})

export const { setIsLoggedInAC } = slice.actions
export const loginReducer = slice.reducer
// export const loginReducer = (state: InitialStateType = initialState, action: FinalLoginActionTypes): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state;
//     }
// }

// export const loginMe = (data: LoginParamsType):AppThunk => (dispatch) => {
//     dispatch(setAppStatus({status: "loading"}))
//     authAPI.login(data)
//         .then(res => {
//             if(res.data.resultCode === 0) {
//                 dispatch(setAppStatus({status: "succeeded"}))
//                 dispatch(setIsLoggedInAC({value: true}))
//             } else {
//                 handleServerAppError(res.data, dispatch)
//                 dispatch(setAppStatus({status: "failed"}))
//             }
//         }
//     )
// }


// export const setIsLoggedInAC = (value: boolean) =>
//     ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// export type FinalLoginActionTypes =
//     ReturnType<typeof setIsLoggedInAC>

export type FinalLoginActionTypes =
    PayloadAction<{value: boolean}>

