import {Provider} from "react-redux";
import React from "react";
import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../../state/todolists-reducer";
import {tasksReducer} from "../../state/tasks-reducer";
import {v1} from "uuid";
import {AppRootState} from "../../state/store";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

const todoListId1 = v1();
const todoListId2 = v1();

const initialGlobalState = {
    tasks: {
        [todoListId1]: [
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Salt", isDone: false},
        ],
    },
    todolists: [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "completed"},
    ]
}

export const storybookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storybookStore}>
        {storyFn()}
    </Provider>
}