import React from "react";
import "./App.css";
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TodoListsList} from "../features/TodoListsList/TodoListsList";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useAppSelector} from "./hooks";
import {RequestStatusType} from "./app-reducer";

type PropsType = {
    demo?: boolean
}

function AppWithRedux(props: PropsType) {

    const {demo = false} = props

    console.log("App" + demo)

    const status = useAppSelector<RequestStatusType>(state => state.app.status)

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
            {status === "loading" && <LinearProgress/>}
            <ErrorSnackbar/>
            <TodoListsList demo={demo}/>

        </div>
    );
}


export default AppWithRedux;
