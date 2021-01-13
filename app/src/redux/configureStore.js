import {combineReducers, createStore} from "redux";
import userRedux from "./ducks/user/user";

const reducer = combineReducers({
    userRedux: userRedux
})

const store = createStore(reducer)

export default store