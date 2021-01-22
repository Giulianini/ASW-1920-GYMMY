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
import {userAxios} from "../../../Api";
import {useSnackbar} from "notistack";


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
        const {enqueueSnackbar} = useSnackbar()
        const [open, setOpen] = React.useState(false);
        const [errors, setErrors] = React.useState({
            "age": false,
            "height": false,
            "weight": false
        })
        const [saveUserInfo, setSaveUserInfo] = React.useState(props.userInfo)

        const handleClickOpen = () => {
            setOpen(true);
        };

        const handleClose = () => {
            setOpen(false);
        };

        const handleChange = (prop) => (event) => {
            let value = event.target.value
            isNaN(value) ? setErrors({...errors, [prop]: true}) : setErrors({...errors, [prop]: false})
            setSaveUserInfo({...saveUserInfo, [prop]: value});
        }

        const handleSave = () => {
            let check = true
            let erroredFields = []
            for (let error in errors) {
                if (errors[error]) {
                    check = false
                    erroredFields.push(error)
                }
            }
            if (check) {
                handleClose()
                userAxios.patch('/measures', {...saveUserInfo})
                    .then(() => {
                        props.setUserInfo({...saveUserInfo})
                        enqueueSnackbar("Personal info saved correctly", {variant: "success"})
                    }).catch(() => {
                    enqueueSnackbar("Cannot save personal info", {variant: "error"})
                })
            } else {
                enqueueSnackbar(`${erroredFields.join(" and ")} must be numbers!`, {variant: "warning"})
            }
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
                        error={errors.age}
                        onChange={handleChange("age")}
                        value={saveUserInfo.age}
                    />
                    <TextField
                        margin="dense"
                        id="height"
                        label="Height"
                        type="text"
                        fullWidth
                        error={errors.height}
                        onChange={handleChange("height")}
                        value={saveUserInfo.height}
                    />
                    <TextField
                        margin="dense"
                        id="weight"
                        label="Weight"
                        type="text"
                        fullWidth
                        error={errors.weight}
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