import {FilterValuesType, TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTaskType = {
    type: "REMOVE-TASK";
    payload: {
        todolistId: string;
        taskId: string;
    };
}

type AddTaskType = {
    type: "ADD-TASK";
    payload: {
        todolistId: string;
        title: string;
    };
}

type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS";
    payload: {
        todolistId: string;
        isDone: boolean
        taskId: string;
    };
}

export type finalActionTypes =
    RemoveTaskType
    | AddTaskType | ChangeTaskStatusType

export const tasksReducer = (state: TasksStateType, action: finalActionTypes): TasksStateType => {
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
        default:
            throw new Error("There isn't this action type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskType => {
    return {type: "REMOVE-TASK", payload: {todolistId, taskId}}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskType => {
    return {type: "ADD-TASK", payload: {todolistId, title}}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: "CHANGE-TASK-STATUS", payload: {todolistId, isDone, taskId}}
}
