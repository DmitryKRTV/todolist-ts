import React, {ChangeEvent, KeyboardEvent, useState, MouseEvent} from "react";
import {FilterValuesType} from "../App";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, id: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)

        if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
            props.addTask(props.id, newTaskTitle.trim());
            setNewTaskTitle("")
        }

        if (e.key === "Enter" && e.currentTarget.value.trim() === "") {
            setError("Field is required")
        }

    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(props.id, newTaskTitle.trim());
            setNewTaskTitle("")
        }
        if (newTaskTitle.trim() === "") {
            setError("Field is required")
        }
        
    }


    const onClickFilterHandler = (filter: FilterValuesType) => {
        return (e: MouseEvent<HTMLButtonElement>) => {
            props.changeFilter(props.id, filter)
        }
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }


    return (
        <div className="App">
            <div>
                <h3>{props.title}
                    <button onClick={removeTodoListHandler}>x</button>
                </h3>
                <div>
                    <input value={newTaskTitle}
                           onChange={onChangeHandler}
                           onKeyDown={onKeyPressHandler}
                           className={error ? "error" : ""}
                    />
                    <button onClick={addTaskHandler}>+</button>
                    {error && <div className={"error-message"}>{error}</div>}
                </div>

                <ul>
                    {props.tasks.map((i) => {

                            const onRemoveHandler = () => {
                                props.removeTask(props.id, i.id)
                            }

                            const onBoxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(props.id, i.id, e.currentTarget.checked)
                            }

                            return (
                                <li className={i.isDone ? "is-done" : ""}
                                    key={`${i.id}`}>
                                    <input type="checkbox"
                                           onChange={onBoxChangeHandler}
                                           checked={i.isDone}
                                    />
                                    <span>{i.title}</span>
                                    <button onClick={onRemoveHandler}>X</button>
                                </li>
                            )
                        }
                    )}
                </ul>

                <div>
                    <button className={props.filter === "all" ? "active-filter" : ""}
                            onClick={onClickFilterHandler("all")}>All
                    </button>
                    <button className={props.filter === "active" ? "active-filter" : ""}
                            onClick={onClickFilterHandler("active")}>Active
                    </button>
                    <button className={props.filter === "completed" ? "active-filter" : ""}
                            onClick={onClickFilterHandler("completed")}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
