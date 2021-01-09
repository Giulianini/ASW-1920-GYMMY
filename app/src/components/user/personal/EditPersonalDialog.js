import React, {forwardRef, useImperativeHandle} from 'react';
import {
    AppBar,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    makeStyles,
    Slide,
    TextField,
    Toolbar
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import {authAxios} from "../../../Api";


const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditPersonalDialog = forwardRef((props, ref) => {
    function MyEditPersonalDialog(props) {
        const classes = useStyles();
        const [open, setOpen] = React.useState(false);
        const [saveUserInfo, setSaveUserInfo] = React.useState({
            "age": "",
            "height": "",
            "weight": ""
        })

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleChange = (prop) => (event) => {
            setSaveUserInfo({ ...saveUserInfo, [prop]: event.target.value });
        };

        const handleSave = () => {
            //Todo check if all numbers
            handleClose()
            let username = localStorage.getItem("username")
            authAxios.patch(
                `/users/${username}/measures`,
                {...saveUserInfo})
                .then(() => {
                    props.setUserInfo({...saveUserInfo})
            }).catch(reason => {
                //Todo
            })
        }

        useImperativeHandle(ref, () => {
            return {
                handleClickOpen: handleClickOpen
            };
        });


        return (
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <ArrowDropDownIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Edit information
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleSave}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DialogContentText>
                        Update your personal information.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="age"
                        label="Age"
                        type="text"
                        fullWidth
                        onChange={handleChange("age")}
                        value={saveUserInfo.age}
                    />
                    <TextField
                        margin="dense"
                        id="height"
                        label="Height"
                        type="text"
                        fullWidth
                        onChange={handleChange("height")}
                        value={saveUserInfo.height}
                    />
                    <TextField
                        margin="dense"
                        id="weight"
                        label="Weight"
                        type="text"
                        fullWidth
                        onChange={handleChange("weight")}
                        value={saveUserInfo.weight}
                    />
                </DialogContent>
            </Dialog>
        );
    }
    return <MyEditPersonalDialog {...props}/>
})

export default EditPersonalDialog;