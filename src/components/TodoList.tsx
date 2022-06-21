import React, {useState} from 'react';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const initialValue = ["Help grandpa"]

    const [events, setEvents] = useState(initialValue);

    const [value, setValue] = useState('');

    const saveTodo = (value: any) => {
        setEvents([...events, value]);
    }

    const deleteEvent = () => {

    }

    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                {/*<div>*/}
                {/*    <input value={""}/>*/}
                {/*    <button>+</button>*/}
                {/*</div>*/}
                <form onSubmit={event => {
                    event.preventDefault()
                    saveTodo(value);
                }}>
                    <input value={value} onChange={e => setValue(e.currentTarget.value)}/>
                    <button type={"submit"}>+</button>
                </form>

                {events.map((i)=><div onClick={deleteEvent}>{i}</div>)}



                <ul>
                    <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                    <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                    <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
                </ul>

                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
