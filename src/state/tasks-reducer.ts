import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

type AddTaskActionType = ReturnType<typeof addTaskAC>;

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;

type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

export type AddTodolistActionType1 = ReturnType<typeof addTodoListAC>;

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;


export type finalActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType1
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: finalActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].filter((i) => i.id !== action.payload.taskId)
            };
        case "ADD-TASK":
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                },
                    ...state[action.payload.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(i => i.id === action.payload.taskId
                    ? {...i, isDone: action.payload.isDone}
                    : i)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(i => i.id === action.payload.taskId
                    ? {...i, title: action.payload.title}
                    : i)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.id]: []
            }
        case "REMOVE-TODOLIST":
            const stateCopy = {...state};
            delete stateCopy[action.payload.todolistId];
            return stateCopy;
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: "REMOVE-TASK", payload: {todolistId, taskId}} as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {type: "ADD-TASK", payload: {todolistId, title}} as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: "CHANGE-TASK-STATUS", payload: {todolistId, isDone, taskId}} as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: "CHANGE-TASK-TITLE", payload: {todolistId, title, taskId}} as const
}

export const addTodoListAC = (title: string) => {
    return {type: "ADD-TODOLIST", payload: {title, id: v1()}} as const
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", payload: {todolistId}} as const
}

