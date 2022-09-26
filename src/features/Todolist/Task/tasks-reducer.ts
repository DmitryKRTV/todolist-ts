import {TasksPriorities, TasksStateType, TasksStatuses, TaskType, todolistAPI} from "../../../api/todolist-api";
import {AddTodolistActionType, SetTodolistsActionType} from "../todolists-reducer";
import {Dispatch} from "redux";
import {AppActionsType, AppRootState, AppThunk} from "../../../app/store";
import {setError, setStatus} from "../../../app/app-reducer";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: FinalTasksActionType): TasksStateType => {
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
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }
        default:
            return state;
    }
}

// export const fetchTasksTC = (todolistsId: string) => (dispatch: Dispatch<AppActionsType>) => {
//     todolistAPI.getTasks(todolistsId)
//         .then(res => {
//             dispatch(setTasksAC(todolistsId, res.data.items))
//         })
// }

export const fetchTasksTC = (todolistsId: string): AppThunk => async dispatch => {
    dispatch(setStatus("loading"))
    const res = await todolistAPI.getTasks(todolistsId)
    dispatch(setTasksAC(todolistsId, res.data.items))
    dispatch(setStatus("succeeded"))
}

export const deleteTaskTC = (todoListId: string, id: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistAPI.deleteTasks(todoListId, id)
        .then(res => {
            dispatch(removeTaskAC(todoListId, id))
        })
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setStatus("loading"))
    todolistAPI.createTasks(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setStatus("succeeded"))
            } else {
                if (res.data.messages.length) {
                    dispatch(setError(res.data.messages[0]))
                } else {
                    dispatch(setError("some error"))
                }
                dispatch(setStatus("failed"))
            }
        })

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
    return (dispatch: Dispatch<AppActionsType>, getState: () => AppRootState) => {

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

//types

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type updateTaskActionType = ReturnType<typeof updateTaskStatusAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;

export type FinalTasksActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | updateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

