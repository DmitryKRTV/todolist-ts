import React from "react";
import "./App.css";
import {TaskType} from "./components/TodoList";
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {
    addTodoListAC,
    changeTaskTitleAC,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import TodoListWithRedux from "./components/TodoListWithRedux";

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists);
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);

    function removeTodoList(todoListId: string) {
        const action = removeTodolistAC(todoListId)
        dispatch(action)
    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }


    function changeTodoListTitle(todoListId: string, value: string) {
        dispatch(changeTodolistTitleAC(todoListId, value))
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

                        return <Grid item key={i.id}>
                            <Paper style={{padding: "20px"}}>
                                <TodoListWithRedux
                                    id={i.id}
                                    title={i.title}
                                    tasks={tasks[i.id]}
                                    filter={i.filter}
                                    removeTodoList={removeTodoList}
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


export default AppWithRedux;
