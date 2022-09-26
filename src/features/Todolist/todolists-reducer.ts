import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setStatus} from "../../app/app-reducer";

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
        case "SET-TODOLIST": {
            return action.todolists.map(i => ({...i, filter: "all", entityStatus: "idle"}))
        }

        default:
            return state;
    }
}

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setStatus("loading"))
    todolistAPI.getTodolist()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setStatus("succeeded"))
        })
}
export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch<RemoveTodolistActionType>) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistsTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setStatus("loading"))
    todolistAPI.createTodolist(title)
        .then(res => {
            // dispatch(addTodolistAC(res.data.data.item))
            dispatch(fetchTodolistsTC())
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<ChangeTodolistTitleActionType>) => {
    todolistAPI.updateTodolist(id, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(id, title))
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
