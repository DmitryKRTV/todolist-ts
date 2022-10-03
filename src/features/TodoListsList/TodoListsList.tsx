import {useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {
    addTodolistsTC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistsTC,
    TodoListDomainType
} from "../Todolist/todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {Container, Grid, Paper} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import TodoListWithRedux from "../Todolist/TodoListWithRedux";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodoListsList = (props: PropsType) => {

    const {demo = false} = props

    const dispatch = useAppDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListDomainType>>(state => state.todolists);

    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) return;

        dispatch(fetchTodolistsTC())
    }, []);

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodolistsTC(todoListId))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistsTC(title))
    }, [dispatch])


    const changeTodoListTitle = useCallback((todoListId: string, value: string) => {
        dispatch(changeTodolistTitleTC(todoListId, value))
    }, [dispatch])


    if(!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }

    return <>
        <Container fixed>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todoLists.map((i) => {

                        return <Grid item key={i.id}>
                            <Paper style={{padding: "20px"}}>
                                <TodoListWithRedux
                                    todolist={i}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }

            </Grid>

        </Container>
    </>

}