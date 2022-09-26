import {appReducer, InitialStateType, setError, setStatus} from "./app-reducer";

let initialState: InitialStateType

beforeEach(() => {
        initialState = {
            status: 'idle',
            error: null
        }
    }
)

test("correct error should be send", () => {

    const endState = appReducer(initialState, setError("some error"));

    expect(endState.error).toBe("some error");
})

test("correct status should be send", () => {

    const endState = appReducer(initialState, setStatus("loading"));

    expect(endState.status).toBe("loading");
})