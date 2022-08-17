import {v1} from "uuid";
import {TasksStateType, TodoListType} from "../App";
import {removeTodolistAC, todolistsReducer} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

test("correct tast should be deleted", () => {

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

    const action = removeTaskAC("2", "todoListId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(4);
    expect(endState["todoListId2"].length).toBe(2);
    expect(endState["todoListId2"].every(t => t.id != "2")).toBeTruthy();
})

test("correct tast should be added", () => {

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

    const action = addTaskAC("bread", "todoListId2");
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

    const action = changeTaskStatusAC("2", false, "todoListId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(4);
    expect(endState["todoListId2"].length).toBe(3);
    expect(endState["todoListId2"][1].isDone).toBe(false);
    expect(endState["todoListId1"][1].isDone).toBe(true);
})