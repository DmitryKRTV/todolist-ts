import {ComponentStory, ComponentMeta} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {v1} from "uuid";
import {TasksPriorities, TasksStatuses} from "../../api/todolist-api";

export default {
    title: "Task Example",
    component: Task,
    argTypes: {},
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

const callback = action("button pressed")
const changeStatusCallback = action("task status changed")
const removeTaskCallback = action("task removed")
const onTitleChangeHandlerCallback = action("Title changed")

export const Task_v1 = Template.bind({});

Task_v1.args = {
    task: {
        id: v1(), title: "HTML", status: TasksStatuses.Completed,
        todoListId: "todoListId1", order: 0, addedDate: "", deadline: "",
        completed: true, startDate: "", description: "", priority: TasksPriorities.Low
    },
    removeTask: removeTaskCallback,
    changeStatus: changeStatusCallback,
    onTitleChangeHandler: () => onTitleChangeHandlerCallback
};

export const TaskBaseExample = () => {
    return <Task TodolistId={"todolistId1"}
                 onTitleChangeHandler={() => onTitleChangeHandlerCallback}
                 removeTask={removeTaskCallback}
                 changeStatus={changeStatusCallback}
                 task={{
                     id: v1(), title: "HTML", status: TasksStatuses.Completed,
                     todoListId: "todolistId1", order: 0, addedDate: "", deadline: "",
                     completed: true, startDate: "", description: "", priority: TasksPriorities.Low
                 }}
    />
}