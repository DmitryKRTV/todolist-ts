import React, {useCallback, useEffect} from "react";
import "./App.css";
import {Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import {Menu} from "@mui/icons-material";
import {TodoListsList} from "../features/TodoListsList/TodoListsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useAppDispatch, useAppSelector} from "./hooks";
import {isInitializedApp, logOut, RequestStatusType} from "./app-reducer";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";

type PropsType = {
    demo?: boolean
}

function AppWithRedux(props: PropsType) {

    const {demo = false} = props

    const dispatch = useAppDispatch();

    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const initialized = useAppSelector<boolean>(state => state.app.initialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

    useEffect(() => {
        dispatch(isInitializedApp())
    }, []);

    const LogOutHandler = useCallback(
        () => {
            dispatch(logOut())
        },
        [dispatch, isLoggedIn],
    );

    if (!initialized) {
        return <div style={{position: "absolute", top: "30%", width: "100%", textAlign: "center"}}><CircularProgress /></div>
    }

    return (
        <BrowserRouter>
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
                        {isLoggedIn && <Button href={"/login"} color="inherit" onClick={LogOutHandler}>Log out</Button>}
                    </Toolbar>

                </AppBar>
                <div className={"progressBar"}>
                    {status === "loading" && <LinearProgress className={"progressBar-child"}/>}
                </div>
                <ErrorSnackbar/>
                <Container fixed>
                    <Routes>
                        <Route path={"/"} element={<TodoListsList demo={demo}/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>} />
                        <Route path='*' element={<Navigate to={"/404"}/>} />
                    </Routes>
                </Container>

            </div>
        </BrowserRouter>
    );
}


export default AppWithRedux;
