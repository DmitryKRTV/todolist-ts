import React from 'react';
import {FilterValuesType} from "../App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {


    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={""}/>
                    <button>+</button>
                </div>

                <ul>
                    {props.tasks.map((i) => {
                            return (
                                    <li><input type="checkbox" checked={i.isDone}/>
                                    <span>{i.title}</span>
                                    <button onClick={()=>{
                                        props.removeTask(i.id)
                                    }}>X</button></li>
                            )
                        }
                    )}
                </ul>

                <div>
                    <button onClick={()=>{props.changeFilter("all")}}>All</button>
                    <button onClick={()=>{props.changeFilter("active")}}>Active</button>
                    <button onClick={()=>{props.changeFilter("completed")}}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
