import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
}

type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type finalActionTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const todolistsReducer = (state: Array<TodoListType>, action: finalActionTypes): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(i => i.id !== action.id);
        case "ADD-TODOLIST":
            const todoListId = v1()
            return [{id: todoListId, title: action.title, filter: "all"}, ...state];
        case "CHANGE-TODOLIST-TITLE":
            return state.map(i => i.id === action.id ? {...i, title: action.title} : i);
        case "CHANGE-TODOLIST-FILTER":
            return state.map(i => i.id === action.id ? {...i, filter: action.filter} : i);

        default:
            throw new Error("There isn't this action type")
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}