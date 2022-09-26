import {applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux";
import {todolistsReducer} from "../features/Todolist/todolists-reducer";
import {tasksReducer} from "../features/Todolist/Task/tasks-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

// type AppRootState = {
//     todolists: Array<TodoListType>;
//     tasks: TasksStateType;
// }

export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;

