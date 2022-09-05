import React, {useReducer, useState} from "react";
import "../App.css";
import TodoList, {TaskType} from "../components/TodoList";
import {v1} from "uuid";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "../state/todolists-reducer";
import {
    addTaskAC,
    addTodoListAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "../state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Sugar", isDone: true},
            {id: v1(), title: "Salt", isDone: false},
        ],
    });

    const [todoLists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "completed"},
    ])

    function removeTask(todoListId: string, id: string) {
        dispatchTasksReducer(removeTaskAC(todoListId, id))
    }

    function removeTodoList(todoListId: string) {
        const action = removeTodolistAC(todoListId)
        dispatchTasksReducer(action)
        dispatchTodolistsReducer(action)
    }

    function addTask(todoListId: string, title: string) {
        dispatchTasksReducer(addTaskAC(todoListId, title))
    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatchTodolistsReducer(action)
        dispatchTasksReducer(action)
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        dispatchTasksReducer(changeTaskStatusAC(todoListId, taskId, isDone))

    }

    function changeTaskTitle(todoListId: string, taskId: string, value: string) {
        dispatchTasksReducer(changeTaskTitleAC(todoListId, taskId, value))
    }


    function changeFilter(todoListId: string, value: FilterValuesType) {
        dispatchTodolistsReducer(changeTodolistFilterAC(todoListId, value))
    }

    function changeTodoListTitle(todoListId: string, value: string) {
        dispatchTodolistsReducer(changeTodolistTitleAC(todoListId, value))
    }


    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map((i) => {

                        let newTasks = tasks[i.id];

                        switch (i.filter) {
                            case "active":
                                newTasks = newTasks.filter((i) => i.isDone === false)
                                break;
                            case "completed":
                                newTasks = newTasks.filter((i) => i.isDone === true)
                                break;
                            default:
                                newTasks = tasks[i.id];
                        }

                        return <Grid item key={i.id}>
                            <Paper style={{padding: "20px"}}>
                                <TodoList
                                    id={i.id}
                                    title={i.title}
                                    tasks={newTasks}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={i.filter}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })}

                </Grid>

            </Container>
        </div>
    );
}


export default AppWithReducers;
