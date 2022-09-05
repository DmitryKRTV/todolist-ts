import {TasksStateType, TodoListType} from "../oldAdd/App";
import {addTodoListAC, tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";

test("it's should me equals", () => {

    const startTaskState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];


    const action = addTodoListAC("new");

    const endTasksState = tasksReducer(startTaskState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)

})
