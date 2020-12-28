import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {Switch, Route, useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";

function App() {
  return (
      <div className={"App"}>
          <Router>
              <Switch>
                  <Route path={"/"} children={<h1>Home</h1>} exact/>
                  <Route path={"/contact"} children={<h1>Contact</h1>}/>
              </Switch>
          </Router>
      </div>
  );
}

export default App;
