import React, {useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./components/TodoList";
import {v1} from "uuid";
import todoList from "./components/TodoList";

export type FilterValuesType = "all" | "completed" | "active";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [tasks, setTasks] = useState({
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

    function removeTask(id: string, todoListId: string) {
        let currentTasks = tasks[todoListId];
        let newTasks = currentTasks.filter((i) => i.id !== id);
        tasks[todoListId] = newTasks;
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let currentTasks = tasks[todoListId];
        let newTasks = [{id: v1(), title, isDone: false}, ...currentTasks];
        tasks[todoListId] = newTasks;
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find((i) => i.id === todoListId)
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let currentTasks = tasks[todoListId];
        let task = currentTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks})
        }
    }

    function removeTodoList(todoListId: string) {
        let filteredTodoList = todoLists.filter((i) => i.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasks[todoListId]
    }


    return (
        <div className="App">
            <div>

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
        </div>
    );
}


export default App;
