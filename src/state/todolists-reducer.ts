import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType1} from "./tasks-reducer";

type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

type AddTodolistActionType = ReturnType<typeof addTodolistAC>

type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type finalActionTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | AddTodolistActionType1


export const todolistsReducer = (state: Array<TodoListType>, action: finalActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(i => i.id !== action.id);
        case "ADD-TODOLIST":
            return [{id: action.payload.id, title: action.payload.title, filter: "all"}, ...state];
        case "CHANGE-TODOLIST-TITLE":
            return state.map(i => i.id === action.id ? {...i, title: action.title} : i);
        case "CHANGE-TODOLIST-FILTER":
            return state.map(i => i.id === action.id ? {...i, filter: action.filter} : i);

        default:
            throw new Error("There isn't this action type")
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", id: todolistId} as const
}

export const addTodolistAC = (title: string) => {
    return {type: "ADD-TODOLIST", payload: {title, id: v1()}} as const
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title} as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter} as const
}