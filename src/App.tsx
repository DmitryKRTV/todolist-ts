import React, {useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./components/TodoList";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    let tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: true},
    ]

    const tasks_2: Array<TaskType> = [
        {id: 1, title: "Milk", isDone: true},
        {id: 2, title: "Cheese", isDone: true},
        {id: 3, title: "Cuc", isDone: false},
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(tasks_1)

    const [filter, setFilter] = useState<FilterValuesType>("all")


    function removeTask(id: number) {
        let newTasks = tasks.filter((i) => i.id !== id)
        setTasks(newTasks);
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
                <TodoList title={"What to learn"} tasks={newTasks} removeTask={removeTask} changeFilter={changeFilter}/>
                <TodoList title={"What to learn more"} tasks={tasks_2} removeTask={removeTask}
                          changeFilter={changeFilter}/>
            </div>
        </div>
    );
}


export default App;
