import React, {ChangeEvent, MouseEvent} from "react";
import {FilterValuesType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, id: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todoListId: string, taskId: string, value: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {

    const onClickFilterHandler = (filter: FilterValuesType) => {
        return (e: MouseEvent<HTMLButtonElement>) => {
            props.changeFilter(props.id, filter)
        }
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const todoListTitleChanger = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }

    return (
        <div className="App">
            <div>
                <h3>
                    <EditableSpan title={props.title}
                                  onChange={todoListTitleChanger}
                    />
                    <button onClick={removeTodoListHandler}>x</button>
                </h3>

                <AddItemForm addItem={addTask}/>

                <ul>
                    {props.tasks.map((i) => {

                            const onRemoveHandler = () => {
                                props.removeTask(props.id, i.id)
                            }

                            const onBoxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(props.id, i.id, e.currentTarget.checked)
                            }

                            const onTitleChangeHandler = (value: string) => {
                                props.changeTaskTitle(props.id, i.id, value)
                            }

                            return (
                                <li className={i.isDone ? "is-done" : ""}
                                    key={`${i.id}`}>
                                    <input type="checkbox"
                                           onChange={onBoxChangeHandler}
                                           checked={i.isDone}
                                    />
                                    <EditableSpan title={i.title}
                                                  onChange={onTitleChangeHandler}
                                    />
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
