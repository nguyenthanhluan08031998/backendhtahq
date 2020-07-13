import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

export default function ResponsiveDialog(props) {
    const { open, handleClose, Word, Description, Pronounce, onButtonTranslate, isCheckTranslate,openButtonTranslate } = props
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    if (isCheckTranslate == false) {
        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={openButtonTranslate}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title">
                    <DialogActions>
                    <Button variant="contained" color="primary" onClick={onButtonTranslate}>Translate</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    if (isCheckTranslate == true) {
        return (
            <div>
                <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">{Word}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {Pronounce}
                        </DialogContentText>
                        <DialogContentText>
                            {Description}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>OK</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

}