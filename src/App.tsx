import React, {useState} from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Salt", isDone: false},
        ],
    });

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "active"},
        {id: todoListId2, title: "What to buy", filter: "completed"},
    ])

    function removeTask(todoListId: string, id: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((i) => i.id !== id)});
    }

    function addTask(todoListId: string, title: string) {
        setTasks({...tasks, [todoListId]: [{id: v1(), title, isDone: false}, ...tasks[todoListId]]})
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(i => i.id === taskId ? {...i, isDone: isDone} : i)})

    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter((i) => i.id !== todoListId))
        delete tasks[todoListId]
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        setTodoLists([...todoLists.map(i => i.id === todoListId ? {...i, filter: value} : i)])
    }

    return (
        <div className="App">
            {todoLists.map((i) => {

                let newTasks = tasks[i.id];

                switch (i.filter) {
                    case "active":
                        newTasks = newTasks.filter((i) => i.isDone === false)
                        break;
                    case "completed":
                        newTasks = newTasks.filter((i) => i.isDone === true)
                        break;
                    default:
                        newTasks = tasks[i.id];
                }

                return <TodoList
                    key={i.id}
                    id={i.id}
                    title={i.title}
                    tasks={newTasks}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    filter={i.filter}
                    removeTodoList={removeTodoList}
                />
            })}
        </div>
    );
}


export default App;
