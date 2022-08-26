import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType, TodoListType} from "../AppWithRedux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

// type AppRootState = {
//     todolists: Array<TodoListType>;
//     tasks: TasksStateType;
// }

export type AppRootState = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer);

// @ts-ignore
window.store = store;
