import React, {useReducer} from "react";
import "../App.css";
import TodoList from "../components/TodoList";
import {v1} from "uuid";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
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
import {TasksPriorities, TasksStatuses} from "../api/todolist-api";

function AppWithReducers() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
        [todoListId1]: [
            {
                id: v1(), title: "HTML", status: TasksStatuses.Completed,
                todoListId: todoListId1, order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: v1(), title: "CSS", status: TasksStatuses.Completed,
                todoListId: todoListId1, order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
        ],
        [todoListId2]: [
            {
                id: v1(), title: "Mill", status: TasksStatuses.Completed,
                todoListId: todoListId2, order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
            {
                id: v1(), title: "Sugar", status: TasksStatuses.Completed,
                todoListId: todoListId2, order: 0, addedDate: "", deadline: "",
                completed: true, startDate: "", description: "", priority: TasksPriorities.Low
            },
        ],
    });

    const [todoLists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todoListId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todoListId2, title: "What to buy", filter: "completed", order: 1, addedDate: ""},
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

    function changeStatus(todoListId: string, taskId: string, status: TasksStatuses) {
        dispatchTasksReducer(changeTaskStatusAC(todoListId, taskId, status))

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
                                newTasks = newTasks.filter((i) => i.status === TasksStatuses.New)
                                break;
                            case "completed":
                                newTasks = newTasks.filter((i) => i.status === TasksStatuses.Completed)
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
