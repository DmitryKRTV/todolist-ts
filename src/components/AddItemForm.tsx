import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormType = {
    addItem: (title: string) => void
}
const AddItemForm: React.FC<AddItemFormType> = ({addItem}) => {

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
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    );
};

export default AddItemForm;