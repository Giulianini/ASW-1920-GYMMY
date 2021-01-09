import User from "./components/user/User";
import "@fontsource/roboto"
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import routes from "./components/Routes";
import Login from "./components/user/authentication/Login";
import Signup from "./components/user/authentication/Signup";
import Home from "./components/Home";
import {CssBaseline} from "@material-ui/core";

function App() {
  return (
      <Router>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline/>
          <Switch>
            <Route path={`/${routes.login.value}`} children={<Login/>}/>
            <Route path={`/${routes.signup.value}`} children={<Signup/>}/>
            <Route path={`/${routes.user.value}`} children={<User/>}/>
            <Route path={`/`} children={<Home/>}/>
          </Switch>
      </Router>
  );
}

export default App;
