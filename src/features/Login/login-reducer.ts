import {AppThunk} from "../../app/store";
import {setAppStatus} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolist-api";
import {handleServerAppError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const loginReducer = (state: InitialStateType = initialState, action: FinalLoginActionTypes): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state;
    }
}

export const loginMe = (data: LoginParamsType):AppThunk => (dispatch) => {
    dispatch(setAppStatus("loading"))
    authAPI.login(data)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setAppStatus("succeeded"))
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatus("failed"))
            }
        }
    )
}


export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

export type FinalLoginActionTypes =
    ReturnType<typeof setIsLoggedInAC>

