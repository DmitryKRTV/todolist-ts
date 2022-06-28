import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "../App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13 && e.currentTarget.value !== "") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle !== "") {
            props.addTask(newTaskTitle);
            setNewTaskTitle("")
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTaskTitle} onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}/>
                    <button onClick={addTaskHandler}>+</button>
                </div>

                <ul>
                    {props.tasks.map((i) => {

                            const onRemoveHandler = () => {
                                props.removeTask(i.id)
                            }

                            return (
                                <li key={`${i.id}`}><input type="checkbox" checked={i.isDone}/>
                                    <span>{i.title}</span>
                                    <button onClick={onRemoveHandler}>X</button>
                                </li>
                            )
                        }
                    )}
                </ul>

                <div>
                    <button onClick={onAllClickHandler}>All</button>
                    <button onClick={onActiveClickHandler}>Active</button>
                    <button onClick={onCompletedClickHandler}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
