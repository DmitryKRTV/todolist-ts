import {v1} from "uuid";
import {
    addTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodoListDomainType,
    todolistsReducer
} from "./todolists-reducer";

let todoListId1: string;
let todoListId2: string;

beforeEach(() => {
        todoListId1 = v1();
        todoListId2 = v1();
    }
)


test("todolistsReducer should delete an element", () => {

    const todoLists: Array<TodoListDomainType> = [
        {id: todoListId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todoListId2, title: "What to buy", filter: "completed", order: 1, addedDate: ""},
    ];

    const endState = todolistsReducer(todoLists, removeTodolistAC(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
})

test("todolistsReducer should add an element", () => {

    const newTodoListTitle = "New todolist"


    const todoLists: Array<TodoListDomainType> = [
        {id: todoListId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todoListId2, title: "What to buy", filter: "completed", order: 1, addedDate: ""},
    ];

    const endState = todolistsReducer(todoLists, addTodolistAC(newTodoListTitle));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodoListTitle);
})

test("correct todolist should change its name", () => {

    const newTodoListTitle = "New todolist"
    //
    // const action = {
    //     type: "CHANGE-TODOLIST-TITLE" as const,
    //     id: todoListId2,
    //     title: newTodoListTitle
    // }

    const todoLists: Array<TodoListDomainType> = [
        {id: todoListId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todoListId2, title: "What to buy", filter: "completed", order: 1, addedDate: ""},
    ];

    const endState = todolistsReducer(todoLists, changeTodolistTitleAC(todoListId2, newTodoListTitle));

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(newTodoListTitle);
})

test("correct filter should be changed", () => {

    const newFilter: FilterValuesType = "all";

    // const action: ChangeTodolistFilterActionType = {
    //     type: "CHANGE-TODOLIST-FILTER",
    //     id: todoListId2,
    //     filter: newFilter
    // }

    const todoLists: Array<TodoListDomainType> = [
        {id: todoListId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todoListId2, title: "What to buy", filter: "completed", order: 1, addedDate: ""},
    ];

    const endState = todolistsReducer(todoLists, changeTodolistFilterAC(todoListId2, newFilter));

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe(newFilter);
})