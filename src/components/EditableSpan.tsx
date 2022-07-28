import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanType = {
    title: string
    onChange: (value: string) => void
}
const EditableSpan: React.FC<EditableSpanType> = ({title, onChange}) => {

    const [editMode, setEditMode] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const activateEditMode = () => {
        setEditMode(true)
        setInputValue(title)
    }

    const disactivateEditMode = () => {
        setEditMode(false)
        onChange(inputValue)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField value={inputValue}
                         variant={"standard"}
                         type="text"
                         onBlur={disactivateEditMode}
                         onChange={onChangeTitle}
                         autoFocus
            />
            : <span onDoubleClick={activateEditMode}>{title}</span>
    );
};

export default EditableSpan;