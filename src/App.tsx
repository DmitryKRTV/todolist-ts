import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./components/TodoList";

function App() {

    const tasks_1: Array<TaskType> = [
        {id: 1, title:"HTML", isDone: true},
        {id: 2, title:"CSS", isDone: true},
        {id: 3, title:"React", isDone: false},
    ]

    const tasks_2: Array<TaskType> = [
        {id: 1, title:"Milk", isDone: true},
        {id: 2, title:"Cheese", isDone: true},
        {id: 3, title:"Cuc", isDone: false},
    ]

    return (
        <div className="App">
            <div>
                <TodoList title={"What to learn"} tasks={tasks_1}/>
                <TodoList title={"What to learn more"} tasks={tasks_2}/>
            </div>
        </div>
    );
}



export default App;
