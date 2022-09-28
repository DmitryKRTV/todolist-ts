import {Provider} from "react-redux";
import React from "react";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../../features/Todolist/todolists-reducer";
import {tasksReducer} from "../../features/Todolist/Task/tasks-reducer";
import {v1} from "uuid";
import {AppRootState} from "../../app/store";
import {TasksPriorities, TasksStatuses} from "../../api/todolist-api";
import {appReducer} from "../../app/app-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

const todoListId1 = v1();
const todoListId2 = v1();

const initialGlobalState : AppRootState = {
    tasks: {
        [todoListId1]: [
            {
                id: v1(), title: "HTML", status: TasksStatuses.Completed,
                todoListId: todoListId1, order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: v1(), title: "CSS", status: TasksStatuses.Completed,
                todoListId: todoListId1, order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
        ],
        [todoListId2]: [
            {
                id: v1(), title: "Mill", status: TasksStatuses.Completed,
                todoListId: todoListId2, order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: v1(), title: "Sugar", status: TasksStatuses.Completed,
                todoListId: todoListId2, order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
        ],
    },
    todolists: [
        {id: todoListId1, title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: "idle"},
        {id: todoListId2, title: "What to buy", filter: "completed", order: 1, addedDate: "",  entityStatus: "loading"},
    ],
    app: {
        error: null,
        status: "idle"
    }
}

export const storybookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storybookStore}>
        {storyFn()}
    </Provider>
}