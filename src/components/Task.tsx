import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./TodoListWithRedux";

type TaskPropsType = {
    TodolistId: string
    onTitleChangeHandler: (TaskId: string) => (value: string) => void
    removeTask: (todoListId: string, id: string) => void
    changeStatus: (todoListId: string, taskId: string, isDone: boolean) => void
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {


    const onRemoveHandler = () => {
        props.removeTask(props.TodolistId, props.task.id)
    }

    const onBoxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.TodolistId, props.task.id, e.currentTarget.checked)
    }

    const onTitleChangeHandlerWithCH = useCallback((props.onTitleChangeHandler), [])

    return (
        <div className={props.task.isDone ? "is-done" : ""}
             key={`${props.task.id}`}>
            <Checkbox
                onChange={onBoxChangeHandler}
                checked={props.task.isDone}
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