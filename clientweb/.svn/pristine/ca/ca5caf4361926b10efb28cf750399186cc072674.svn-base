import React from 'react'
import { useTranslation } from "react-i18next";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';

import { makeStyles } from '@material-ui/core/styles';//css
import styles from '../styles/Game.styles';//css
import { useItem } from '../hooks/CreateRoomHook';
import CustomCard from "@/components/Card/Card";
import { Link } from "react-router-dom";
import { formatDate } from "@/app/utils/dataService"
import Function from "@/app/Modules/Function/components/Function";
import InputText from "@/components/Input/InputText"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


const useStyles = makeStyles(styles);///
const selector = formValueSelector("CreateRoomForm");


const RoomList = (props) => {
    const { t } = useTranslation()
    const classes = useStyles();
    const IsPassword = useSelector((state) => selector(state, "IsPassword"));
    const { submitFailed, history, location, initialize, handleSubmit, notification } = props;



    const {
        roomList,
        open,
        password,
        selectedRoom,
        onJoinGame,
        handleClose,
        onChangePassword,
        onCheckPassword
    } = useItem({ history, location, isNullOrEmpty, t, notification })


    return (
        <>
            <Grid item xs={12} align="right">
                <Button className={classes.button} onClick={() => history.push(`/game/menu`)} variant="outlined" color="primary" startIcon={<Icon>arrow_back</Icon>}>
                    {t("Trở về")}
                </Button>
            </Grid>
            <Grid container item xs={12} >
                <Grid item xs={4}>
                    <Function history={history} />
                </Grid>
                <Grid item xs={8} align="center">
                    <CustomCard title={t("Danh sách phòng")}>
                        <Grid item xs={12}>
                            <List component="nav" aria-label="main mailbox folders">
                                {roomList.map((room, index) => (
                                    <ListItem key={index} button onClick={onJoinGame.bind(this, room)}>
                                        <ListItemText style={{ width: "40%" }} primary={room.name} />
                                        <ListItemText style={{ width: "40%" }} primary={room.owner.Name} />
                                        <ListItemAvatar style={{ width: "10%" }}>
                                            {isNullOrEmpty(room.password) ? <Icon>lock_open</Icon> : <Icon>https</Icon>}
                                        </ListItemAvatar>
                                        <ListItemAvatar style={{ width: "10%" }}>
                                            <Icon>settings</Icon>
                                        </ListItemAvatar>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </CustomCard>
                </Grid>
            </Grid>




            <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {isNullOrEmpty(selectedRoom.password) ? "Tham gia vào phòng" : t("Nhập mật khẩu vào phòng")}
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="body1">{selectedRoom.name}</Typography>
                            <Typography variant="body1">{`${t("Thời gian trả lời")} : ${selectedRoom.time} s`}</Typography>
                            <Typography variant="body1">{`${t("Số lượng người chơi")} : ${selectedRoom.numOfPlayers}`}</Typography>
                        </Grid>
                        {!isNullOrEmpty(selectedRoom.password) &&
                            <Grid item xs={12}>
                                <InputText
                                    label={t("Mật khẩu")}
                                    type="password"
                                    fullWidth
                                    value={password}
                                    onChange={onChangePassword}
                                />
                            </Grid>
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary" variant="outlined" startIcon={<Icon>close</Icon>}>
                        {t("Đóng")}
                    </Button>
                    <Button autoFocus onClick={onCheckPassword} color="primary" variant="contained" startIcon={<Icon>arrow_forward</Icon>}>
                        {t("Vào phòng")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


function isNullOrEmpty(data) {
    if (data === null) {
        return true;
    }
    if (data === "") {
        return true;
    }
    if (data === undefined) {
        return true;
    }
    if (typeof data === "undefined") {
        return true;
    }
    return false;
}

export default RoomList