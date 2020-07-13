import React from 'react'
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles';//css
import styles from '../styles/Game.styles';//css
import { useItem } from '../hooks/MenuHook';
import CustomCard from "@/components/Card/Card";
import { Link } from "react-router-dom";
import { formatDate } from "@/app/utils/dataService"
import Function from "@/app/Modules/Function/components/Function";
import InputText from "@/components/Input/InputText"
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import RoomList from './roomList.png'
import createRoom from './createRoom.png'
const useStyles = makeStyles(styles);///

const Menu = (props) => {
    const { t } = useTranslation()
    const classes = useStyles();
    const { submitFailed, history, location, initialize, handleSubmit, notification } = props;
    const {

    } = useItem({ history, location })
    return (
        <>
            <Grid item align="right">
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    startIcon={<Icon>save</Icon>}
                    type="submit"
                // onClick={handleSubmit(addOrUpdate)}
                >
                    {t("Lưu")}
                </Button>
                <Button className={classes.button} variant="outlined" color="primary" onClick={() => history.goBack()} startIcon={<Icon>arrow_back</Icon>}>
                    {t("Trở về")}
                </Button>
            </Grid>
            <Grid item container>
                <Grid item xs={4}>
                    <Function history={history} />
                </Grid>
                <Grid item xs={8}>
                    <Paper style={{ paddingLeft: 20, paddingRight: 20, margin: 10 }}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button onClick={() => history.push('/game/taophong')}>
                                <ListItemAvatar style={{ width: "20%" }}>
                                    <Avatar style={{ width: 70, height: 70 }} src={createRoom}></Avatar>
                                </ListItemAvatar>
                                <ListItemText style={{ width: "80%" }}>
                                    <Typography variant="h6">{t("Tạo phòng")}</Typography>
                                </ListItemText>
                            </ListItem>
                            <ListItem button onClick={() => history.push('/game/danhsachphong')}>
                                <ListItemAvatar style={{ width: "20%" }}>
                                    <Avatar style={{ width: 70, height: 70 }} src={RoomList}></Avatar>
                                </ListItemAvatar>
                                <ListItemText style={{ width: "80%" }}>
                                    <Typography variant="h6">{t("Tham gia phòng")}</Typography>
                                </ListItemText>
                            </ListItem>
                            {/* <ListItem button >
                                <ListItemAvatar style={{ width: "20%" }}>
                                    <Avatar style={{ width: 70, height: 70 }} src={RoomList}></Avatar>
                                </ListItemAvatar>
                                <ListItemText style={{ width: "80%" }}>
                                    <Typography variant="h6">{t("Lịch sử")}</Typography>
                                </ListItemText>
                            </ListItem> */}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}



export default Menu