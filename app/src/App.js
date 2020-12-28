import User from "./components/user/User";
import "@fontsource/roboto"
import {ThemeProvider} from "@material-ui/core/styles";
import {theme, darkMode} from "./theme";
import React from "react";
import {CssBaseline} from "@material-ui/core";

function App() {
  return (
      <div className={"App"}>
              <User/>
      </div>
  );
}

export default App;
