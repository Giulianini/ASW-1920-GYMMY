import {combineReducers, createStore} from "redux";
import appUI from './ducks/appUI'

const reducer = combineReducers({
    appUIReducer: appUI
})

const store = createStore(reducer)

export default store