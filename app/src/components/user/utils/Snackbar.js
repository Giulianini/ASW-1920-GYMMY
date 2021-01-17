import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Slide, Snackbar as Snack} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const SnackBar = forwardRef((props, ref) => {
    function MySnackbar(props) {
        const [open, setOpen] = useState(false)
        const [message, setMessage] = useState("")
        const [severity, setSeverity] = useState("success")

        const handleMessage = (message, severity) => {
            setSeverity(severity)
            setMessage(message)
            setOpen(true)
        }

        useImperativeHandle(ref, () => {
            return {
                handleMessage: handleMessage
            };
        });

        function TransitionRight(props) {
            return <Slide {...props} direction="left"/>
        }

        return (
            <Snack
                key={message ? message.key : undefined}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={open}
                TransitionComponent={TransitionRight}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                onExited={() => {
                }}
                message={message ? message : undefined}>
                <Alert onClose={() => setOpen(false)} severity={severity} variant={"filled"}>
                    {message}
                </Alert>
            </Snack>
        );
    }

    return <MySnackbar {...props}/>
})
export default SnackBar


