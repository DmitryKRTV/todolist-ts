import React, {ChangeEvent, MouseEvent} from "react";
import {FilterValuesType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {changeTodolistFilterAC} from "../state/todolists-reducer";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoListWithRedux = (props: TodoListPropsType) => {

    const {tasks, filter} = props;

    const dispatch = useDispatch();

    const onClickFilterHandler = (filter: FilterValuesType) => {
        return (e: MouseEvent<HTMLButtonElement>) => {
            dispatch(changeTodolistFilterAC(props.id, filter))
        }
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(props.id, title))
    }

    const todoListTitleChanger = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }


    function removeTask(todoListId: string, id: string) {
        dispatch(removeTaskAC(todoListId, id))
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todoListId, taskId, isDone))

    }

    const onTitleChangeHandler = (TaskId: string) => {
        return (value: string) => dispatch(changeTaskTitleAC(props.id, TaskId, value))
    }

    let newTasks = tasks;

    switch (filter) {
        case "active":
            newTasks = newTasks.filter((i) => i.isDone === false)
            break;
        case "completed":
            newTasks = newTasks.filter((i) => i.isDone === true)
            break;
        default:
            newTasks = tasks;
    }

    return (
        <div className="App">
            <div>
                <div>
                    <EditableSpan title={props.title}
                                  onChange={todoListTitleChanger}
                    />
                    <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                        <Delete/>
                    </IconButton>
                </div>

                <AddItemForm addItem={addTask}/>

                <div>
                    {newTasks.map((i) => {

                            const onRemoveHandler = () => {
                                removeTask(props.id, i.id)
                            }

                            const onBoxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                changeStatus(props.id, i.id, e.currentTarget.checked)
                            }

                            return (
                                <div className={i.isDone ? "is-done" : ""}
                                     key={`${i.id}`}>
                                    <Checkbox
                                        onChange={onBoxChangeHandler}
                                        checked={i.isDone}
                                    />
                                    <EditableSpan title={i.title}
                                                  onChange={onTitleChangeHandler(i.id)}
                                    />
                                    <IconButton aria-label="delete" onClick={onRemoveHandler}>
                                        <Delete/>
                                    </IconButton>
                                </div>
                            )
                        }
                    )}
                </div>

                <div>
                    <Button variant={props.filter === "all" ? "contained" : "text"}
                            onClick={onClickFilterHandler("all")}
                    >All
                    </Button>
                    <Button color={"primary"}
                            variant={props.filter === "active" ? "contained" : "text"}
                            onClick={onClickFilterHandler("active")}
                    >Active
                    </Button>
                    <Button color={"secondary"}
                            variant={props.filter === "completed" ? "contained" : "text"}
                            onClick={onClickFilterHandler("completed")}
                    >Completed
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TodoListWithRedux;
