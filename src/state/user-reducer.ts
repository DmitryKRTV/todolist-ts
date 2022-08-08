type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}


export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "INCREMENT-AGE":
            return {...state, age: state.age + 1};
            break;
        case "INCREMENT-CHILDREN-COUNT":
            return {...state, childrenCount: state.childrenCount + 1};
            break;
        case "CHANGE-NAME":
            return {...state, name: action.newName};
            break;

        default:
            throw new Error("There isn't this action type")
    }
}