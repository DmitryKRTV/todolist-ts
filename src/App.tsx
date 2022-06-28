import React, {useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    let tasks_1: Array<TaskType> = [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: true},
    ]

    const tasks_2: Array<TaskType> = [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Cheese", isDone: true},
        {id: v1(), title: "Cuc", isDone: false},
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(tasks_1)

    const [filter, setFilter] = useState<FilterValuesType>("all")


    function removeTask(id: string) {
        let newTasks = tasks.filter((i) => i.id !== id)
        setTasks(newTasks);
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let newTasks = tasks;

    switch (filter) {
        case "active":
            newTasks = tasks.filter((i) => i.isDone === false)
            break;
        case "completed":
            newTasks = tasks.filter((i) => i.isDone === true)
            break;
        default:
            newTasks = tasks;
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }


    return (
        <div className="App">
            <div>
                <TodoList title={"What to learn"} tasks={newTasks} removeTask={removeTask} changeFilter={changeFilter}
                          addTask={addTask}/>
                {/*<TodoList title={"What to learn more"} tasks={tasks_2} removeTask={removeTask}*/}
                {/*          changeFilter={changeFilter} addTask={addTask}/>*/}
            </div>
        </div>
    );
}


export default App;
