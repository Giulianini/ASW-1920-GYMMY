import {createMuiTheme} from '@material-ui/core/styles';
import {blue, red} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: red[500],
        },
        secondary: {
            main: blue[700],
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