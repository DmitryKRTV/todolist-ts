import {userReducer} from "./user-reducer";

let startState: { age: number; childrenCount: number; name: string };

beforeEach(() => {
    startState = {age: 20, childrenCount: 2, name: "Dimich"};
})


test("user reducer should increment only age", () => {
    const endState = userReducer(startState, {type: "INCREMENT-AGE"});

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
})

test("user reducer should increment only children", () => {
    const endState = userReducer(startState, {type: "INCREMENT-CHILDREN-COUNT"});

    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
})

test("user reducer should change username", () => {
    const newName = "Victor";

    const endState = userReducer(startState, {type: "CHANGE-NAME", newName: newName});

    expect(endState.name).toBe(newName);
})