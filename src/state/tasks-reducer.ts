import {v1} from "uuid";
import {TasksPriorities, TasksStateType, TasksStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {setTodolistFilterAC, SetTodolistFilterActionType} from "./todolists-reducer";
import {Dispatch} from "redux";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

type AddTaskActionType = ReturnType<typeof addTaskAC>;

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;

type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

export type AddTodolistActionType1 = ReturnType<typeof addTodoListAC>;

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;

export type SetTasksActionType = ReturnType<typeof setTasksAC>;


export type finalActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType1
    | RemoveTodolistActionType
    | SetTodolistFilterActionType
    | SetTasksActionType

export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: finalActionType): TasksStateType => {
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
                    id: v1(), title: action.payload.title, status: TasksStatuses.New,
                    todoListId: action.payload.todolistId, order: 0, addedDate: "", deadline: "",
                    completed: true, startDate: "", description: "", priority: TasksPriorities.Low
                },
                    ...state[action.payload.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(i => i.id === action.payload.taskId
                    ? {...i, status: action.payload.status}
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

        case "SET-TODOLIST": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[`${tl.id}`] = []
            })
            return copyState
        }
        case "SET_TASKS": {
            const copyState = {...state}
            copyState[action.payload.todolistId] = action.payload.tasks
            return copyState
        }
        default:
            return state;
    }
}

export const fetchTasksTC = (todolistsId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(todolistsId)
            .then(res => {
                dispatch(setTasksAC(todolistsId, res.data.items))
            })
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: "REMOVE-TASK", payload: {todolistId, taskId}} as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {type: "ADD-TASK", payload: {todolistId, title}} as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TasksStatuses) => {
    return {type: "CHANGE-TASK-STATUS", payload: {todolistId, status, taskId}} as const
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

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: "SET_TASKS", payload: {todolistId, tasks}} as const
}

