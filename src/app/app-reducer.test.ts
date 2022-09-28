import {appReducer, InitialStateType, setAppError, setAppStatus} from "./app-reducer";

let initialState: InitialStateType

beforeEach(() => {
        initialState = {
            status: 'idle',
            error: null
        }
    }
)

test("correct error should be send", () => {

    const endState = appReducer(initialState, setAppError("some error"));

    expect(endState.error).toBe("some error");
})

test("correct status should be send", () => {

    const endState = appReducer(initialState, setAppStatus("loading"));

    expect(endState.status).toBe("loading");
})