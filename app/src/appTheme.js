import {createMuiTheme} from '@material-ui/core/styles';
import {blue, red} from "@material-ui/core/colors";

const appTheme = createMuiTheme({
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

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: red[600],
        },
        secondary: {
            main: blue[500],
        },
    }
})

export {appTheme, darkTheme}