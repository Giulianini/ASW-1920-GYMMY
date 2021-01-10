import User from "./components/user/User";
import "@fontsource/roboto"
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import routes from "./components/Routes";
import Login from "./components/user/authentication/Login";
import Signup from "./components/user/authentication/Signup";
import Home from "./components/Home";
import {CssBaseline} from "@material-ui/core";
import {Provider} from "react-redux";
import store from "./redux/configureStore";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <CssBaseline/>
                <Switch>
                    <Route path={`/${routes.login.value}`} children={<Login/>}/>
                    <Route path={`/${routes.signup.value}`} children={<Signup/>}/>
                    <Route path={`/${routes.user.value}`} children={<User/>}/>
                    <Route path={`/`} children={<Home/>}/>
                </Switch>
            </Router>
        </Provider>
    );
}

export default App;
