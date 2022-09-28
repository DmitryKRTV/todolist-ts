import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

const AddItemForm: React.FC<AddItemFormType> = React.memo((props) => {
    console.log("Add item form")

    const {addItem, disabled = false} = props;

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter" && (title.trim() === "")) {
            setError("Field is required")
            return
        }

        if (error !== null) {
            setError(null)
        }

        if (e.key === "Enter" && title.trim() !== "") {
            addItem(title.trim());
            setTitle("")
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
                       label={error ? "Field is required" : "Type value"}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
                       disabled={disabled}
            />
            <IconButton onClick={addTaskHandler}
                        color={"primary"}
                // style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                        style={{margin: "8px 0px"}}
                        disabled={disabled}
            >
                <ControlPoint/>
            </IconButton>
        </div>
    );
});

export default AddItemForm;