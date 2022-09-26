import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
}

type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistFilterActionType = ReturnType<typeof setTodolistFilterAC>

export type finalTodoListActionTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistFilterActionType

const initialState: Array<TodoListDomainType> = []


export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: finalTodoListActionTypes): Array<TodoListDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(i => i.id !== action.payload.todolistId);
        }
        case "ADD-TODOLIST": {
            return [{...action.payload, filter: "all"} as TodoListDomainType, ...state];
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(i => i.id === action.id ? {...i, title: action.title} : i);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(i => i.id === action.id ? {...i, filter: action.filter} : i);
        }
        case "SET-TODOLIST": {
            return action.todolists.map(i => ({...i, filter: "all"}))
        }

        default:
            return state;
    }
}

export const fetchTodolistsTC = () => (dispatch: Dispatch<finalTodoListActionTypes>) => {
        todolistAPI.getTodolist()
            .then(res => {
                dispatch(setTodolistFilterAC(res.data))
            })
    }


export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch<finalTodoListActionTypes>) => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))
            })
    }


export const addTodolistsTC = (title: string) => (dispatch: Dispatch<finalTodoListActionTypes>) => {
        todolistAPI.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }


export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<finalTodoListActionTypes>) => {
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

export const setTodolistFilterAC = (todolists: Array<TodolistType>) => {
    return {type: "SET-TODOLIST", todolists} as const
}