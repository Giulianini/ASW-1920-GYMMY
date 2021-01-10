import {createMuiTheme} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import {blue, red} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: red[700],
        },
        secondary: {
            main: green[700],
        },
    },
});

const darkMode = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: red[800],
        },
        secondary: {
            main: blue[500],
        },
    }
})

export {theme, darkMode}