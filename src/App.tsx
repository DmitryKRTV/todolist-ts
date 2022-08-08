import React, {useState} from "react";
import "./App.css";
import TodoList, {TaskType} from "./components/TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListId1 = v1();
    const todoListId2 = v1();

    const [tasks, setTasks] = useState<TasksStateType>({
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

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "completed"},
    ])

    function removeTask(todoListId: string, id: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((i) => i.id !== id)});
    }

    function removeTodoList(todoListId: string) {
        setTodoLists(todoLists.filter((i) => i.id !== todoListId))
        delete tasks[todoListId]
    }

    function addTask(todoListId: string, title: string) {
        setTasks({...tasks, [todoListId]: [{id: v1(), title, isDone: false}, ...tasks[todoListId]]})
    }

    const addTodoList = (title: string) => {
        const todoListId = v1()
        setTodoLists([{id: todoListId, title, filter: "all"}, ...todoLists])
        setTasks({...tasks, [todoListId]: []})
    }

    function changeStatus(todoListId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(i => i.id === taskId ? {...i, isDone: isDone} : i)})
    }

    function changeTaskTitle(todoListId: string, taskId: string, value: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(i => i.id === taskId ? {...i, title: value} : i)})
    }


    function changeFilter(todoListId: string, value: FilterValuesType) {
        setTodoLists([...todoLists.map(i => i.id === todoListId ? {...i, filter: value} : i)])
    }

    function changeTodoListTitle(todoListId: string, value: string) {
        setTodoLists([...todoLists.map(i => i.id === todoListId ? {...i, title: value} : i)])
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


export default App;
