import {v1} from "uuid";
import {TasksPriorities, TasksStateType, TasksStatuses, TaskType, todolistAPI} from "../api/todolist-api";
import {AddTodolistActionType, SetTodolistFilterActionType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;

type AddTaskActionType = ReturnType<typeof addTaskAC>;

type updateTaskActionType = ReturnType<typeof updateTaskStatusAC>;

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;

export type SetTasksActionType = ReturnType<typeof setTasksAC>;


export type finalActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | updateTaskActionType
    | AddTodolistActionType
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
                [action.payload.task.todoListId]: [action.payload.task,
                    ...state[action.payload.task.todoListId]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(i => i.id === action.payload.taskId
                    ? {...i, ...action.payload.model}
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

export const deleteTaskTC = (todoListId: string, id: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTasks(todoListId,id)
            .then(res => {
                dispatch(removeTaskAC(todoListId, id))
            })
    }
}

export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTasks(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

type UpdatedTaskDomainType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TasksStatuses
    priority?: TasksPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, model: UpdatedTaskDomainType) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {

        const state = getState();
        const task = state.tasks[todolistId].find(task => task.id === taskId)

        if (!task) {
            throw new Error("Task not found")
        }

        todolistAPI.updateTasks(todolistId, taskId, {
            completed: task.completed,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...model
        })
            .then(res => {
                dispatch(updateTaskStatusAC(todolistId, taskId, model))
            })
    }
}


export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: "REMOVE-TASK", payload: {todolistId, taskId}} as const
}

export const addTaskAC = (task: TaskType) => {
    return {type: "ADD-TASK", payload: {task}} as const
}

export const updateTaskStatusAC = (todolistId: string, taskId: string, model: UpdatedTaskDomainType) => {
    return {type: "UPDATE-TASK", payload: {todolistId, model, taskId}} as const
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: "REMOVE-TODOLIST", payload: {todolistId}} as const
}

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
    return {type: "SET_TASKS", payload: {todolistId, tasks}} as const
}

