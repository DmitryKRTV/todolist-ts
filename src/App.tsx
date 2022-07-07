import React, {useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

function App() {

    const tasks_1: Array<TaskType> = [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: true},
    ]


    const [tasks, setTasks] = useState<Array<TaskType>>(tasks_1)

    const [filter, setFilter] = useState<FilterValuesType>("all")


    function removeTask(id: string) {
        let newTasks = tasks.filter((i) => i.id !== id)
        setTasks(newTasks);
    }

    function addTask(title: string) {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    let newTasks;

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

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks([...tasks]);

    }


    return (
        <div className="App">
            <div>
                <TodoList title={"What to learn"}
                          tasks={newTasks}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          changeTaskStatus={changeStatus}
                          filter={filter}
                />
                {/*<TodoList title={"What to learn more"} tasks={tasks_2} removeTask={removeTask}*/}
                {/*          changeFilter={changeFilter} addTask={addTask}/>*/}
            </div>
        </div>
    );
}


export default App;
