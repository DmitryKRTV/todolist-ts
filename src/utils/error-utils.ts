import {setAppError, setAppStatus} from "../app/app-reducer";
import {ResponseType} from "../api/todolist-api";
import {AppDispatch} from "../app/store";
import {AxiosError} from "axios";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: any) => {
    if (data.messages.length) {
        dispatch(setAppError({error: data.messages[0]}))
    } else {
        dispatch(setAppError({error: "some error occurred"}))
    }
    dispatch(setAppStatus({status: "failed"}))
}

export const handleServerNetworkError = (error: AxiosError, dispatch: any) => {
    dispatch(setAppError(error.message ? {error: error.message} : {error: "some error occurred"}))
    dispatch(setAppStatus({status: "failed"}))
}

