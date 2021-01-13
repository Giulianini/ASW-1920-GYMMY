import {combineReducers, createStore} from "redux";
import userRedux from "./ducks/user/user";
import trainingRedux from "./ducks/training/training"

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (e) {
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        console.log(e)
        return undefined
    }
}

const reducer = combineReducers({
    userRedux: userRedux,
    trainingRedux: trainingRedux
})

const persistedState = loadFromLocalStorage()

const store = createStore(reducer, persistedState)

store.subscribe(() => saveToLocalStorage(store.getState()))
export default store