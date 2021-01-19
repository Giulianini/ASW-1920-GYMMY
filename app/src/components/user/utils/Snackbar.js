import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Slide, Snackbar as Snack} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

const SnackBar = forwardRef((props, ref) => {
    function MySnackbar() {
        const [open, setOpen] = useState(false)
        const [message, setMessage] = useState(null)
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

        const handleClose = () => {
            setOpen(false)
            setMessage(null)
        }

        function TransitionRight(props) {
            return <Slide {...props} direction="left"/>
        }

        if (message) {
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
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity={severity} variant={"filled"}>
                        {message}
                    </Alert>
                </Snack>
            )
        } else {
            return null
        }

    }

    return <MySnackbar {...props}/>
})
export default SnackBar


