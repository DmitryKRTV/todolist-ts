import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {FinalTodoListActionTypes, todolistsReducer} from "../features/Todolist/todolists-reducer";
import {FinalTasksActionType, tasksReducer} from "../features/Todolist/Task/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, FinalAppActionsType} from "./app-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootState = ReturnType<typeof rootReducer>
export type AppActionsType = FinalTasksActionType | FinalTodoListActionTypes | FinalAppActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootState, unknown, AppActionsType>
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootState, unknown, AppActionsType>

// @ts-ignore
// window.store = store;

