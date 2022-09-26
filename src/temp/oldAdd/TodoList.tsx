import React, {ChangeEvent, MouseEvent} from "react";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../components/EditableSpan/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TasksStatuses, TaskType} from "../../api/todolist-api";
import {FilterValuesType} from "../../features/Todolist/todolists-reducer";
import {useDispatch} from "react-redux";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, id: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, status: TasksStatuses) => void
    changeTaskTitle: (todoListId: string, taskId: string, value: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, title: string) => void
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

    const onTitleChangeHandler = (TaskId: string) => {
        return (value: string) => props.changeTaskTitle(props.id, TaskId, value)
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
                    {props.tasks.map((i) => {

                            const onRemoveHandler = () => {
                                props.removeTask(props.id, i.id)
                            }

                            const onBoxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(props.id, i.id, TasksStatuses.Completed)
                            }


                            return (
                                <div className={i.status === TasksStatuses.Completed ? "is-done" : ""}
                                     key={`${i.id}`}>
                                    <Checkbox
                                        onChange={onBoxChangeHandler}
                                        checked={i.status === TasksStatuses.Completed}
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

export default TodoList;