import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatus} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: FinalTodoListActionTypes): Array<TodoListDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(i => i.id !== action.payload.todolistId);
        }
        case "ADD-TODOLIST": {
            return [{...action.payload, filter: "all", entityStatus: "idle"} as TodoListDomainType, ...state];
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(i => i.id === action.id ? {...i, title: action.title} : i);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(i => i.id === action.id ? {...i, filter: action.filter} : i);
        }
        case "CHANGE-TODOLIST-ENTITY-STATUS": {
            return state.map(i => i.id === action.id ? {...i, entityStatus: action.status} : i);
        }
        case "SET-TODOLIST": {
            return action.todolists.map(i => ({...i, filter: "all", entityStatus: "idle"}))
        }

        default:
            return state;
    }
}

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatus("loading"))
    todolistAPI.getTodolist()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatus("succeeded"))
        })
        .catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const removeTodolistsTC = (todolistId: string):AppThunk => (dispatch) => {
    dispatch(setAppStatus("loading"))
    dispatch(changeTodolistEntityStatusAC(todolistId,"loading"))
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatus("succeeded"))
            dispatch(changeTodolistEntityStatusAC(todolistId,"succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodolistEntityStatusAC(todolistId,"failed"))
        })
}
export const addTodolistsTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatus("loading"))
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            // dispatch(fetchTodolistsTC())
            dispatch(setAppStatus("succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatus("loading"))
    dispatch(changeTodolistEntityStatusAC(id,"loading"))
    todolistAPI.updateTodolist(id, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(id, title))
            dispatch(setAppStatus("succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodolistEntityStatusAC(id,"failed"))
        })
}


export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", payload: {todolistId}} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: "ADD-TODOLIST", payload: todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter} as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: "SET-TODOLIST", todolists} as const
}
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {type: "CHANGE-TODOLIST-ENTITY-STATUS", id, status} as const
}

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus : RequestStatusType
}

type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type FinalTodoListActionTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
