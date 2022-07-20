import React, {ChangeEvent, useState} from "react";

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
            ? <input value={inputValue}
                     type="text"
                     onBlur={disactivateEditMode}
                     onChange={onChangeTitle}
                     autoFocus
            />
            : <span onDoubleClick={activateEditMode}>{title}</span>
    );
};

export default EditableSpan;