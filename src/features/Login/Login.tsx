import React from "react";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import {loginMe} from "./login-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate} from "react-router-dom";

export const Login = () => {

    const dispatch = useAppDispatch()

    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginMe(values))
            formik.resetForm()
        },
    })

    if(isLoggedIn) {
        return <Navigate to={"/"}/>
    }

    return <Grid container justifyContent={"center"}>
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>
                            To log in get registered <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>here</a>
                        </p>
                        <p>
                            or use common test account credentials:
                        </p>
                        <p>
                            Email: free@samuraijs.com
                        </p>
                        <p>
                            Password: free
                        </p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label={"Email"}
                                   margin={"normal"}
                                   {...formik.getFieldProps("email")}
                        ></TextField>
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type={"password"}
                                   label={"Password"}
                                   margin={"normal"}
                                   {...formik.getFieldProps("password")}
                        ></TextField>
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel
                            control={<Checkbox
                                {...formik.getFieldProps("rememberMe")}
                                checked={formik.values.rememberMe}
                            />}
                            label="Remember me"/>
                        <Button type={"submit"} variant={"contained"} color={"primary"}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
};

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
