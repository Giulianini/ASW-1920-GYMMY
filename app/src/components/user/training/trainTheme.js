import {createMuiTheme} from "@material-ui/core/styles";
import {grey, red} from "@material-ui/core/colors";

export const trainLightTheme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: grey[100],
        },
        secondary: {
            main: red[500],
        },
    }
})

export const trainDarkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: grey[800],
        },
        secondary: {
            main: red[700],
        },
    }
})
