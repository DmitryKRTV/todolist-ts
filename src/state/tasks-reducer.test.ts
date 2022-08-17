import {v1} from "uuid";
import {TasksStateType, TodoListType} from "../App";
import {todolistsReducer} from "./todolists-reducer";
import {
    addTaskAC,
    addTodoListAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, removeTodolistAC,
    tasksReducer
} from "./tasks-reducer";

test("correct test should be deleted", () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: true},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Sugar", isDone: true},
            {id: "3", title: "Salt", isDone: false},
        ],
    }

    const action = removeTaskAC("todoListId2", "2");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(4);
    expect(endState["todoListId2"].length).toBe(2);
    expect(endState["todoListId2"].every(t => t.id != "2")).toBeTruthy();
    expect(endState).toEqual({
        "todoListId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: true},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "3", title: "Salt", isDone: false},
        ],
    })
})

test("correct task should be added", () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: true},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Sugar", isDone: true},
            {id: "3", title: "Salt", isDone: false},
        ],
    }

    const action = addTaskAC("todoListId2", "bread");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(4);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe("bread");
    expect(endState["todoListId2"][0].isDone).toBe(false);

})

test("correct task status should be changed", () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: true},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Sugar", isDone: true},
            {id: "3", title: "Salt", isDone: false},
        ],
    }

    const action = changeTaskStatusAC("todoListId2", "2", false);
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(4);
    expect(endState["todoListId2"].length).toBe(3);
    expect(endState["todoListId2"][1].isDone).toBe(false);
    expect(endState["todoListId1"][1].isDone).toBe(true);
    expect(endState).toEqual({
        "todoListId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: true},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Sugar", isDone: false},
            {id: "3", title: "Salt", isDone: false},
        ],
    })
})

test("correct task title should be changed", () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: true},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Sugar", isDone: true},
            {id: "3", title: "Salt", isDone: false},
        ],
    }

    const action = changeTaskTitleAC("todoListId2", "2", "Vodka");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(4);
    expect(endState["todoListId2"].length).toBe(3);
    expect(endState["todoListId2"][1].title).toBe("Vodka");
    expect(endState).toEqual({
        "todoListId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: true},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Vodka", isDone: true},
            {id: "3", title: "Salt", isDone: false},
        ],
    })
})

test("new array should be added", () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {id: "1", title: "HTML", isDone: true},
            {id: "2", title: "CSS", isDone: true},
            {id: "3", title: "React", isDone: false},
            {id: "4", title: "Redux", isDone: true},
        ],
        "todoListId2": [
            {id: "1", title: "Milk", isDone: true},
            {id: "2", title: "Sugar", isDone: true},
            {id: "3", title: "Salt", isDone: false},
        ],
    }


    const action = addTodoListAC("New Todolist");
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(i => i != "todoListId1" && i != "todoListId2")
    if (!newKey) {
        throw Error("new key should be added")
    }


    expect(endState["todoListId1"].length).toBe(4);
    expect(endState["todoListId2"].length).toBe(3);

})

test("property with todolistId should be deleted", () => {
    const startState: TasksStateType = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }

    const action = removeTodolistAC("todolistId2")

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
})