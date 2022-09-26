import {useDispatch, useSelector} from "react-redux";
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

export const TodoListsList = () => {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListDomainType>>(state => state.todolists);

    useEffect(() => {
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
                                    id={i.id}
                                    title={i.title}
                                    filter={i.filter}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }

            </Grid>

        </Container>
    </>

}