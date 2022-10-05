import React, {useCallback, useEffect} from "react";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {addTaskTC, deleteTaskTC, fetchTasksTC, updateTaskStatusTC,} from "./Task/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {changeTodolistFilterAC, FilterValuesType, TodoListDomainType} from "./todolists-reducer";
import {AppRootState} from "../../app/store";
import {Task} from "./Task/Task";
import {TasksStatuses, TaskType} from "../../api/todolist-api";

type TodoListPropsType = {
    todolist: TodoListDomainType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
    demo?: boolean
}


const TodoListWithRedux = React.memo((props: TodoListPropsType) => {

    const {todolist, demo = false} = props;

    const tasks = useSelector<AppRootState, Array<TaskType>>(state => state.tasks[todolist.id]);

    const dispatch = useDispatch<any>();

    useEffect(() => {
        if(demo) return;
        dispatch(fetchTasksTC(todolist.id))
    }, [demo, dispatch, todolist.id]);


    const onClickFilterHandler = useCallback((filter: FilterValuesType) => {
        return () => {
            dispatch(changeTodolistFilterAC(todolist.id, filter))
        }
    }, [dispatch, todolist.id])

    const removeTodoListHandler = () => {
        props.removeTodoList(todolist.id)
    }

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(todolist.id, title))
    }, [dispatch, todolist.id])

    const todoListTitleChanger = useCallback((title: string) => {
        props.changeTodoListTitle(todolist.id, title)
    }, [props, todolist.id])


    function removeTask(todoListId: string, id: string) {
        dispatch(deleteTaskTC(todoListId, id))
    }

    function changeStatus(todoListId: string, taskId: string, status: TasksStatuses) {
        dispatch(updateTaskStatusTC(todoListId, taskId, {status}))

    }

    const onTitleChangeHandler = useCallback((TaskId: string) => {
        return (value: string) => dispatch(updateTaskStatusTC(todolist.id, TaskId, {title: value}))
    }, [dispatch, todolist.id])

    let newTasks = tasks;

    switch (todolist.filter) {
        case "active":
            newTasks = newTasks.filter((i) => i.status === TasksStatuses.New)
            break;
        case "completed":
            newTasks = newTasks.filter((i) => i.status === TasksStatuses.Completed)
            break;
        default:
            newTasks = tasks;
    }

    return (
        <div className="App">
            <div>
                <div>
                    <EditableSpan title={todolist.title}
                                  onChange={todoListTitleChanger}
                    />
                    <IconButton aria-label="delete"
                                onClick={removeTodoListHandler}
                                disabled={props.todolist.entityStatus === "loading"}
                    >
                        <Delete/>
                    </IconButton>
                </div>

                <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>

                <div>
                    {newTasks.map((task) => <Task TodolistId={todolist.id}
                                                  onTitleChangeHandler={onTitleChangeHandler(task.id)}
                                                  removeTask={removeTask}
                                                  changeStatus={changeStatus}
                                                  task={task}
                                                  key={task.id}/>)}
                </div>

                <div>
                    <Button variant={todolist.filter === "all" ? "contained" : "text"}
                            onClick={onClickFilterHandler("all")}
                    >All
                    </Button>
                    <Button color={"primary"}
                            variant={todolist.filter === "active" ? "contained" : "text"}
                            onClick={onClickFilterHandler("active")}
                    >Active
                    </Button>
                    <Button color={"secondary"}
                            variant={todolist.filter === "completed" ? "contained" : "text"}
                            onClick={onClickFilterHandler("completed")}
                    >Completed
                    </Button>
                </div>
            </div>
        </div>
    );
})

export default TodoListWithRedux;
