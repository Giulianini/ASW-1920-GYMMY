import User from "./components/user/User";
import "@fontsource/roboto"
import {ThemeProvider} from "@material-ui/core/styles";
import {theme, darkMode} from "./theme";
import React from "react";
import {CssBaseline} from "@material-ui/core";

function App() {
  return (
      <div className={"App"}>
          <ThemeProvider theme={darkMode}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline/>
              <User/>
          </ThemeProvider>
      </div>
  );
}

export default App;
