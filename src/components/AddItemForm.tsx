import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
}
const AddItemForm: React.FC<AddItemFormType> = (props) => {

    const {addItem} = props;

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)

        if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
            addItem(title.trim());
            setTitle("")
        }

        if (e.key === "Enter" && e.currentTarget.value.trim() === "") {
            setError("Field is required")
        }
    }

    const addTaskHandler = () => {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("")
        }
        if (title.trim() === "") {
            setError("Field is required")
        }
    }

    return (
        <div>
            <TextField variant={"outlined"}
                       label={"Type value"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addTaskHandler} color={"primary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;