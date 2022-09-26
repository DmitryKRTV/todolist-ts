import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TasksStatuses, TaskType} from "../../../api/todolist-api";

type TaskPropsType = {
    TodolistId: string
    onTitleChangeHandler: (value: string) => void
    removeTask: (todoListId: string, id: string) => void
    changeStatus: (todoListId: string, taskId: string, status: TasksStatuses) => void
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {


    const onRemoveHandler = () => {
        props.removeTask(props.TodolistId, props.task.id)
    }

    const onBoxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.TodolistId, props.task.id, props.task.status === TasksStatuses.Completed ? TasksStatuses.New : TasksStatuses.Completed)
    }

    const onTitleChangeHandlerWithCH = useCallback((props.onTitleChangeHandler), [])

    return (
        <div className={props.task.status === TasksStatuses.Completed ? "is-done" : ""}
             key={`${props.task.id}`}>
            <Checkbox
                onChange={onBoxChangeHandler}
                checked={props.task.status === TasksStatuses.Completed}
            />
            <EditableSpan title={props.task.title}
                          onChange={onTitleChangeHandlerWithCH}
            />
            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})