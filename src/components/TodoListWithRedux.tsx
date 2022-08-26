import React, {MouseEvent, useCallback} from "react";
import {FilterValuesType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {changeTodolistFilterAC} from "../state/todolists-reducer";
import {AppRootState} from "../state/store";
import {Task} from "./Task";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoListWithRedux = React.memo((props: TodoListPropsType) => {

    const {id, filter} = props;

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[id]);

    console.log("Todo")


    const dispatch = useDispatch();

    const onClickFilterHandler = useCallback((filter: FilterValuesType) => {
        return (e: MouseEvent<HTMLButtonElement>) => {
            dispatch(changeTodolistFilterAC(props.id, filter))
        }
    }, [props.id, filter])

    const removeTodoListHandler = () => {
        props.removeTodoList(props.id)
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.id, title))
    }, [props.id])

    const todoListTitleChanger = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.id, props.changeTodoListTitle])


    function removeTask(todoListId: string, id: string) {
        dispatch(removeTaskAC(todoListId, id))
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todoListId, taskId, isDone))

    }

    const onTitleChangeHandler = useCallback((TaskId: string) => {
        return (value: string) => dispatch(changeTaskTitleAC(props.id, TaskId, value))
    }, [dispatch, props.id])

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
                    {newTasks.map((i) => <Task TodolistId={props.id} onTitleChangeHandler={onTitleChangeHandler}
                                               removeTask={removeTask} changeStatus={changeStatus} task={i}
                                               key={i.id}/>)}
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
})

export default TodoListWithRedux;