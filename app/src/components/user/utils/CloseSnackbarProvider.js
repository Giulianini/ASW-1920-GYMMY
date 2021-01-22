import React from 'react';
import {SnackbarProvider} from "notistack";
import IconButton from "@material-ui/core/IconButton";
import {Close} from "@material-ui/icons";

function CloseSnackbarProvider(props) {
    const notificationStackRef = React.createRef();
    const onClickDismiss = key => () => {
        notificationStackRef.current.closeSnackbar(key);
    }
    return (
        <SnackbarProvider maxSnack={3}
                          preventDuplicate
                          ref={notificationStackRef}
                          anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                          }}
                          action={(key) => (
                              <IconButton onClick={onClickDismiss(key)}>
                                  <Close/>
                              </IconButton>
                          )}>
            {props.children}
        </SnackbarProvider>
    )
}

export default CloseSnackbarProvider;