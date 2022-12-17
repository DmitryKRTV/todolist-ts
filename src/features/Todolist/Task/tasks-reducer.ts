import {TasksPriorities, TasksStateType, TasksStatuses, TaskType, todolistAPI} from "../../../api/todolist-api";
import {addTodolistAC, fetchTodolists, removeTodolistAC} from "../todolists-reducer";
import {AppRootState, AppThunk} from "../../../app/store";
import {setAppStatus} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

const initialState: TasksStateType = {}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistsId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: "loading"}))
    const res = await todolistAPI.getTasks(todolistsId)
    thunkAPI.dispatch(setAppStatus({ status: "succeeded"}))
    return {todolistId: todolistsId, tasks: res.data.items}
})

export const deleteTask = createAsyncThunk('tasks/deleteTask', (param: {todoListId: string, id: string}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({ status: "loading"}))
    return todolistAPI.deleteTasks(param.todoListId, param.id)
        .then(res => {
            thunkAPI.dispatch(setAppStatus({ status: "succeeded"}))
            return {todolistId: param.todoListId, taskId: param.id}
        })
        // .catch((error) => {
        //     handleServerNetworkError(error, thunkAPI.dispatch)
        // })
})


const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task,
                    ...state[action.payload.task.todoListId]]
            }
        },
        // setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
        //     return {...state, [action.payload.todolistId]: action.payload.tasks}
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            const copyState = {...state}
            action.payload.todolists.forEach(tl => {
                copyState[`${tl.id}`] = []
            })
            return copyState
        });
        builder.addCase(addTodolistAC, (state, action) => {
            return {
                ...state,
                [action.payload.todolist.id]: []
            }
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId];
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        })
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            return {
                ...state, [action.payload.todolistId]:
                    state[action.payload.todolistId].filter((i) => i.id !== action.payload.taskId)
            };
        })
        builder.addCase(updateTaskStatusTC.fulfilled, (state, action) => {
            if (action.payload.todolistId) {
                return {
                    ...state,
                    [action.payload.todolistId]: state[action.payload.todolistId].map(i => i.id === action.payload.taskId
                        ? {...i, ...action.payload.model}
                        : i)
                }
            }

        })
    }
})

export const tasksReducer = slice.reducer

export const {
    addTaskAC,
} = slice.actions



export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatus({ status: "loading"}))
    todolistAPI.createTasks(todolistId, title)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatus({ status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatus({ status: "failed"}))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
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

export const updateTaskStatusTC = createAsyncThunk("tasks/updateTask", async (param: { todolistId: string, taskId: string, model: UpdatedTaskDomainType }, {dispatch, rejectWithValue, getState}) => {

        dispatch(setAppStatus({ status: "loading"}))

        const state = getState() as AppRootState;
        const task = state.tasks[param.todolistId].find(task => task.id === param.taskId)

        if (!task) {
            dispatch(setAppStatus({ status: "failed"}))
            throw new Error("Task not found")
        }

        try {
            const res = await todolistAPI.updateTasks(param.todolistId, param.taskId, {
                completed: task.completed,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                status: task.status,
                title: task.title,
                ...param.model
            })
            if (res.data.resultCode === 0) {
                dispatch(setAppStatus({ status: "succeeded"}))
                return {todolistId: param.todolistId, taskId: param.taskId, model: param.model}

            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setAppStatus({ status: "failed"}))
                return rejectWithValue({})
            }
        } catch (err: any) {
            const error: AxiosError = err;
            handleServerNetworkError(error, dispatch)
            dispatch(setAppStatus({ status: "failed"}))
            return rejectWithValue({})
        }
    })

// export const updateTaskStatus = (todolistId: string, taskId: string, model: UpdatedTaskDomainType): AppThunk => {
//     return (dispatch, getState: () => AppRootState) => {
//         dispatch(setAppStatus({ status: "loading"}))
//
//         const state = getState();
//         const task = state.tasks[todolistId].find(task => task.id === taskId)
//
//         if (!task) {
//             dispatch(setAppStatus({ status: "failed"}))
//             throw new Error("Task not found")
//         }
//
//         todolistAPI.updateTasks(todolistId, taskId, {
//             completed: task.completed,
//             deadline: task.deadline,
//             description: task.description,
//             priority: task.priority,
//             startDate: task.startDate,
//             status: task.status,
//             title: task.title,
//             ...model
//         })
//             .then(res => {
//                 if(res.data.resultCode === 0) {
//                     dispatch(updateTaskStatusAC({todolistId, taskId, model}))
//                     dispatch(setAppStatus({ status: "succeeded"}))
//
//                 } else {
//                     handleServerAppError(res.data, dispatch)
//                     dispatch(setAppStatus({ status: "failed"}))
//                 }
//             })
//             .catch((error) => {
//                 handleServerNetworkError(error, dispatch)
//                 dispatch(setAppStatus({ status: "failed"}))
//             })
//     }
// }

// export const tasksReducer = (state: TasksStateType = initialState, action: FinalTasksActionType): TasksStateType => {
//     switch (action.type) {
//         case "REMOVE-TASK":
//             return {
//                 ...state, [action.payload.todolistId]:
//                     state[action.payload.todolistId].filter((i) => i.id !== action.payload.taskId)
//             };
//         case "ADD-TASK":
//             return {
//                 ...state,
//                 [action.payload.task.todoListId]: [action.payload.task,
//                     ...state[action.payload.task.todoListId]]
//             }
//         case "UPDATE-TASK":
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].map(i => i.id === action.payload.taskId
//                     ? {...i, ...action.payload.model}
//                     : i)
//             }
//         case "ADD-TODOLIST":
//             return {
//                 ...state,
//                 [action.payload.id]: []
//             }
//         case "REMOVE-TODOLIST":
//             const stateCopy = {...state};
//             delete stateCopy[action.payload.todolistId];
//             return stateCopy;
//
//         case "SET-TODOLIST": {
//             const copyState = {...state}
//             action.todolists.forEach(tl => {
//                 copyState[`${tl.id}`] = []
//             })
//             return copyState
//         }
//         case "SET_TASKS": {
//             return {...state, [action.payload.todolistId]: action.payload.tasks}
//         }
//         default:
//             return state;
//     }
// }

// export const removeTaskAC = (todolistId: string, taskId: string) => {
//     return {type: "REMOVE-TASK", payload: {todolistId, taskId}} as const
// }
// export const addTaskAC = (task: TaskType) => {
//     return {type: "ADD-TASK", payload: {task}} as const
// }
// export const updateTaskStatusAC = (todolistId: string, taskId: string, model: UpdatedTaskDomainType) => {
//     return {type: "UPDATE-TASK", payload: {todolistId, model, taskId}} as const
// }
// export const removeTodolistAC = (todolistId: string) => {
//     return {type: "REMOVE-TODOLIST", payload: {todolistId}} as const
// }
// export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) => {
//     return {type: "SET_TASKS", payload: {todolistId, tasks}} as const
// }

//types

// type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
// type AddTaskActionType = ReturnType<typeof addTaskAC>;
// type updateTaskActionType = ReturnType<typeof updateTaskStatusAC>;
// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
// export type SetTasksActionType = ReturnType<typeof setTasksAC>;

// export type FinalTasksActionType =
//     RemoveTaskActionType
//     | AddTaskActionType
//     | updateTaskActionType
//     | AddTodolistActionType
//     | RemoveTodolistActionType
//     | SetTodolistsActionType
//     | SetTasksActionType

export type FinalTasksActionType =
    PayloadAction<{ todolistId: string, taskId: string }> |
    PayloadAction<{ todolistId: string }> |
    PayloadAction<{ todolistId: string, tasks: Array<TaskType> }> |
    PayloadAction<{ todolistId: string, taskId: string, model: UpdatedTaskDomainType }> |
    PayloadAction<{ task: TaskType }>

