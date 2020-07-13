import React from 'react';
import { useTranslation } from "react-i18next";


import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles/Settings.style';


const useStyles = makeStyles(styles);


const DialogFavorite = (props) => {
    const classes = useStyles();

    const {
        open,
        handleClose,
        handleChangePage,
        handleChangeRowsPerPage,
        data,
        page,
        rowsPerPage,
    } = props
    const { t } = useTranslation()
    return (
        <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                {t("Danh sách các từ đã chọn")}
            </DialogTitle>
            <DialogContent dividers>
                <Paper>
                    <TableContainer style={{ maxHeight: 350 }}>
                        <Table size="small" stickyHeader aria-label="sticky table">
                            <TableBody>
                                {data.ListGrid.map((x, i) => (
                                    <TableRow key={i} className={classes.columnHover} >
                                        <TableCell>{x.Word}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.TotalCount}
                        labelRowsPerPage={t("Số dòng")}
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose} color="secondary" variant="outlined" startIcon={<Icon>close</Icon>}>
                    {t("Đóng")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const DialogTitle = (props) => {
    const classes = useStyles();

    const { children, onClose } = props;
    return (
        <MuiDialogTitle disableTypography>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}

        </MuiDialogTitle>
    );
};

export default DialogFavorite