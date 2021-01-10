import {combineReducers, createStore} from "redux";
import appUI from './ducks/user/user'

const reducer = combineReducers({
    appUIReducer: appUI
})

const store = createStore(reducer)

export default store