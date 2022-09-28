import {setAppError, setAppStatus} from "../app/app-reducer";
import {ResponseType} from "../api/todolist-api";
import {AppDispatch} from "../app/store";
import {AxiosError} from "axios";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: AppDispatch) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]))
    } else {
        dispatch(setAppError("some error occurred"))
    }
    dispatch(setAppStatus("failed"))
}

export const handleServerNetworkError = (error: AxiosError, dispatch: AppDispatch) => {
    dispatch(setAppError(error.message ? error.message : "some error occurred"))
    dispatch(setAppStatus("failed"))
}


export {}