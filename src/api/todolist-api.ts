import axios from "axios"

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "64b4d118-e3b8-47de-a70e-563a8b9d0ed6"
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TasksStatuses
    priority: TasksPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type ResponseTasksType = {
    error: string | null
    items: TaskType[]
    totalCount: number
}

type UpdatedTask = {
    title: string
    description: string
    completed: boolean
    status: TasksStatuses
    priority: TasksPriorities
    startDate: string
    deadline: string
}



export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export enum TasksStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TasksPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export const todolistAPI = {
    getTodolist() {
        const promise = instance.get<Array<TodolistType>>("todo-lists",
        )
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>(
            `todo-lists/`,
            {title: title},
        )
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(
            `todo-lists/${todolistId}`,
        )
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title: title},
        )
        return promise
    },
    getTasks(todolistId: string) {
        return instance.get<ResponseTasksType>(`/todo-lists/${todolistId}/tasks`)
    },

    createTasks(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks/`, {title: taskTitle})
    },

    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTasks(todolistId: string, taskId: string, updatedTask: UpdatedTask) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, updatedTask)
    },

}