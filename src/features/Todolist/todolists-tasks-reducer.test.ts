import {tasksReducer} from "./Task/tasks-reducer";
import {addTodolistAC, setTodolistsAC, TodoListDomainType, todolistsReducer} from "./todolists-reducer";
import {TasksStateType, TodolistType} from "../../api/todolist-api";

test("it's should me equals", () => {

    const startTaskState: TasksStateType = {};
    const startTodolistsState: Array<TodoListDomainType> = [];


    const action = addTodolistAC( {id: "1", title: "new", order: 0, addedDate: ""});

    const endTasksState = tasksReducer(startTaskState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)

})

test("exmty tasks shpld be added", () => {

    const todoLists = [
        {id: "1", title: "What to learn", order: 0, addedDate: ""},
        {id: "2", title: "What to buy", order: 1, addedDate: ""},
    ];

    const endTasksState = tasksReducer({}, setTodolistsAC(todoLists));

    expect(endTasksState["1"]).toStrictEqual([])
    expect(endTasksState["2"]).toStrictEqual([])

})