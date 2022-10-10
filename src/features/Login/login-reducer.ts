import {AppThunk} from "../../app/store";
import {setAppStatus} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

const slice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn =  action.payload.value
        },
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

export const loginMe = (data: LoginParamsType):AppThunk => (dispatch) => {
    dispatch(setAppStatus({status: "loading"}))
    authAPI.login(data)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setAppStatus({status: "succeeded"}))
                dispatch(setIsLoggedInAC({value: true}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatus({status: "failed"}))
            }
        }
    )
}


// export const setIsLoggedInAC = (value: boolean) =>
//     ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// export type FinalLoginActionTypes =
//     ReturnType<typeof setIsLoggedInAC>

export type FinalLoginActionTypes =
    PayloadAction<{value: boolean}>

