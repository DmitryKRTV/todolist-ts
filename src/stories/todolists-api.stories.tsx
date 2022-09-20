import {ComponentStory, ComponentMeta} from "@storybook/react";
import React, {useEffect, useState} from "react";
import {action} from "@storybook/addon-actions";
import axios from "axios"
import {todolistAPI} from "../api/todolist-api";
import AddItemForm from "../components/AddItemForm/AddItemForm";

export default {
    title: "API",
    // component: AddItemForm,
    argTypes: {},
    args:{}
}
// } as ComponentMeta<typeof AddItemForm>;

// const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;
//
// export const AddItemForm_v1 = Template.bind({});
//
// const callback = action("button pressed")
//
// AddItemForm_v1.args = {
//     addItem: (title: string) => {
//         alert(title)
//     }
// };

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "64b4d118-e3b8-47de-a70e-563a8b9d0ed6"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>({name: "Dmitry"})
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolist()
                .then(resp => {
                setState(resp.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.createTodolist("new Todo")
            .then(resp => console.log(resp)).catch((resolve) => console.log(resolve))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.deleteTodolist("d9b63858-97c3-498f-ba82-43fd7fafe2d1")
            .then(resp => console.log(resp)).catch((resolve) => console.log(resolve))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.updateTodolist("d9b63858-97c3-498f-ba82-43fd7fafe2d1", "New new title")
            .then(resp => console.log(resp)).catch((resolve) => console.log(resolve))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>({name: "Dmitry"})
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todoloistId = "f0546be0-5b7f-4456-889c-963a23ed0b66"
        todolistAPI.getTasks(todoloistId)
            .then(resp => {
                console.log(resp.data)
                setState(resp.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTasks = () => {
    const [state, setState] = useState<any>({name: "Dmitry"})
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todoloistId = "f0546be0-5b7f-4456-889c-963a23ed0b66"
        const taskTitle = "US"
        todolistAPI.createTasks(todoloistId, taskTitle)
            .then(resp => {
                console.log(resp.data)
                setState(resp.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTasks = () => {
    const [state, setState] = useState<any>({name: "Dmitry"})
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todoloistId = "f0546be0-5b7f-4456-889c-963a23ed0b66"
        const taskid = ""
        todolistAPI.deleteTasks(todoloistId,taskid)
            .then(resp => {
                console.log(resp)
                setState(resp.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>({name: "Dmitry"})
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todoloistId = "f0546be0-5b7f-4456-889c-963a23ed0b66"
        const taskid = "f8bf7575-d100-46e4-aade-fcb01db890d3"
        const updatedTask = {
            title: "JS",
            description: "Updated",
            completed: false,
            status: 0,
            priority: 1,
            startDate: "",
            deadline: "",
        }
        todolistAPI.updateTasks(todoloistId,taskid,updatedTask)
            .then(resp => {
                console.log(resp)
                setState(resp.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}