import {v1} from "uuid";
import {AddTodolistActionType1} from "./tasks-reducer";
import {TodolistType} from "../api/todolist-api";

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListDomainType = TodolistType & {
    filter: FilterValuesType
}

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

const initialState: Array<TodoListDomainType> = []




export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: finalActionTypes): Array<TodoListDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(i => i.id !== action.payload.todolistId);
        case "ADD-TODOLIST":
            return [{
                id: action.payload.id,
                title: action.payload.title,
                filter: "all",
                addedDate: "",
                order: 0
            }, ...state];
        case "CHANGE-TODOLIST-TITLE":
            return state.map(i => i.id === action.id ? {...i, title: action.title} : i);
        case "CHANGE-TODOLIST-FILTER":
            return state.map(i => i.id === action.id ? {...i, filter: action.filter} : i);

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", payload: {todolistId}} as const
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