import React, {useCallback} from "react";
import "./App.css";
import AddItemForm from "./components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    changeTodolistTitleAC,
    removeTodolistAC, TodoListDomainType,
} from "./state/todolists-reducer";
import {
    addTodoListAC,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import TodoListWithRedux from "./components/TodoListWithRedux";
import {TodolistType} from "./api/todolist-api";

let a = 0;

function AppWithRedux() {

    console.log("App")

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListDomainType>>(state => state.todolists);


    const removeTodoList = useCallback((todoListId: string) => {
        const action = removeTodolistAC(todoListId)
        a++;
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])


    const changeTodoListTitle = useCallback((todoListId: string, value: string) => {
        dispatch(changeTodolistTitleAC(todoListId, value))
    }, [dispatch])

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
