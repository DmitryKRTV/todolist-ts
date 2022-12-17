import {addTaskAC, deleteTask, fetchTasks, tasksReducer} from "./tasks-reducer";
import {TasksPriorities, TasksStateType, TasksStatuses} from "../../../api/todolist-api";
import {addTodolistAC, removeTodolistAC} from "../todolists-reducer";

test("correct test should be deleted", () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {
                id: "1", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "2", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "3", title: "Mill", status: TasksStatuses.New,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "4", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
        ],
        "todoListId2": [
            {
                id: "1", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "2", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "3", title: "Mill", status: TasksStatuses.New,
                todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
        ],
    }

    const action = deleteTask.fulfilled({todolistId: "todoListId2", taskId: "2"}, "", {
        todoListId: "todoListId2",
        id: "2"
    });
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(4);
    expect(endState["todoListId2"].length).toBe(2);
    // expect(endState["todoListId2"].every(t => t.id != "2")).toBeTruthy();
    // expect(endState).toEqual({
    //     "todoListId1": [
    //         {id: "1", title: "HTML", isDone: true},
    //         {id: "2", title: "CSS", isDone: true},
    //         {id: "3", title: "React", isDone: false},
    //         {id: "4", title: "Redux", isDone: true},
    //     ],
    //     "todoListId2": [
    //         {id: "1", title: "Milk", isDone: true},
    //         {id: "3", title: "Salt", isDone: false},
    //     ],
    // })
})

test("correct task should be added", () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {
                id: "1", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "2", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "3", title: "Mill", status: TasksStatuses.New,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "4", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
        ],
        "todoListId2": [
            {
                id: "1", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "2", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "3", title: "Mill", status: TasksStatuses.New,
                todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
        ],
    }

    const action = addTaskAC({
        task: {
            id: "2", title: "bread", status: TasksStatuses.New,
            todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
            completed: true, startDate: "", description: "", priority: TasksPriorities.Low
        }
    });
    const endState = tasksReducer(startState, action)

    expect(endState["todoListId1"].length).toBe(5);
    expect(endState["todoListId2"].length).toBe(3);
    expect(endState["todoListId1"][0].id).toBeDefined();
    expect(endState["todoListId1"][0].title).toBe("bread");
    expect(endState["todoListId1"][0].status).toBe(TasksStatuses.New);

})

// test("correct task status should be changed", () => {
//
//     const startState: TasksStateType = {
//         "todoListId1": [
//             {
//                 id: "1", title: "Mill", status: TasksStatuses.Completed,
//                 todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//             {
//                 id: "2", title: "Mill", status: TasksStatuses.Completed,
//                 todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//             {
//                 id: "3", title: "Mill", status: TasksStatuses.New,
//                 todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//             {
//                 id: "4", title: "Mill", status: TasksStatuses.Completed,
//                 todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//         ],
//         "todoListId2": [
//             {
//                 id: "1", title: "Mill", status: TasksStatuses.Completed,
//                 todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//             {
//                 id: "2", title: "Mill", status: TasksStatuses.Completed,
//                 todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//             {
//                 id: "3", title: "Mill", status: TasksStatuses.New,
//                 todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//         ],
//     }
//
//     const action = updateTaskStatusAC({
//         todolistId: "todoListId2", taskId: "2",
//         model: {
//             status: TasksStatuses.New
//         }
//     });
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todoListId1"].length).toBe(4);
//     expect(endState["todoListId2"].length).toBe(3);
//     expect(endState["todoListId2"][1].status).toBe(TasksStatuses.New);
//     expect(endState["todoListId1"][1].status).toBe(TasksStatuses.Completed);
//     // expect(endState).toEqual({
//     //     "todoListId1": [
//     //         {id: "1", title: "HTML", isDone: true},
//     //         {id: "2", title: "CSS", isDone: true},
//     //         {id: "3", title: "React", isDone: false},
//     //         {id: "4", title: "Redux", isDone: true},
//     //     ],
//     //     "todoListId2": [
//     //         {id: "1", title: "Milk", isDone: true},
//     //         {id: "2", title: "Sugar", isDone: false},
//     //         {id: "3", title: "Salt", isDone: false},
//     //     ],
//     // })
// })

// test("correct task title should be changed", () => {
//
//     const startState: TasksStateType = {
//         "todoListId1": [
//             {
//                 id: "1", title: "Mill", status: TasksStatuses.Completed,
//                 todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//             {
//                 id: "2", title: "Mill", status: TasksStatuses.Completed,
//                 todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//             {
//                 id: "3", title: "Mill", status: TasksStatuses.New,
//                 todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//             {
//                 id: "4", title: "Mill", status: TasksStatuses.Completed,
//                 todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//         ],
//         "todoListId2": [
//             {
//                 id: "1", title: "Mill", status: TasksStatuses.Completed,
//                 todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//             {
//                 id: "2", title: "Mill", status: TasksStatuses.Completed,
//                 todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//             {
//                 id: "3", title: "Mill", status: TasksStatuses.New,
//                 todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
//                 completed: true, startDate: "", description: "", priority: TasksPriorities.Low
//             },
//         ],
//     }
//
//     const action = updateTaskStatusAC({
//         todolistId: "todoListId2", taskId: "2",
//         model: {
//             title: "Vodka"
//         }
//     });
//     const endState = tasksReducer(startState, action)
//
//     expect(endState["todoListId1"].length).toBe(4);
//     expect(endState["todoListId2"].length).toBe(3);
//     expect(endState["todoListId2"][1].title).toBe("Vodka");
//     // expect(endState).toEqual({
//     //     "todoListId1": [
//     //         {id: "1", title: "HTML", isDone: true},
//     //         {id: "2", title: "CSS", isDone: true},
//     //         {id: "3", title: "React", isDone: false},
//     //         {id: "4", title: "Redux", isDone: true},
//     //     ],
//     //     "todoListId2": [
//     //         {id: "1", title: "Milk", isDone: true},
//     //         {id: "2", title: "Vodka", isDone: true},
//     //         {id: "3", title: "Salt", isDone: false},
//     //     ],
//     // })
// })

test("new array should be added", () => {

    const startState: TasksStateType = {
        "todoListId1": [
            {
                id: "1", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "2", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "3", title: "Mill", status: TasksStatuses.New,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "4", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
        ],
        "todoListId2": [
            {
                id: "1", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "2", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "3", title: "Mill", status: TasksStatuses.New,
                todoListId: "todoListId2", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
        ],
    }


    const action = addTodolistAC({todolist: {addedDate: "", id: "4", order: 0, title: "New todolist"}});
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
        "todoListId1": [
            {
                id: "1", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "2", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "3", title: "Mill", status: TasksStatuses.New,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "4", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
        ],
    }

    const action = removeTodolistAC({todolistId: "todolistId2"})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistId2"]).not.toBeDefined()
})

test("tasks should be added", () => {
    const startState: TasksStateType = {
        "todoListId1": [
            {
                id: "1", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "2", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "3", title: "Mill", status: TasksStatuses.New,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: "4", title: "Mill", status: TasksStatuses.Completed,
                todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
        ],
    }

    const endState = tasksReducer({}, fetchTasks.fulfilled({
        todolistId: "todoListId1",
        tasks: startState["todoListId1"]
    }, "", "todoListId1"))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todoListId1"].length).toBe(4)
})