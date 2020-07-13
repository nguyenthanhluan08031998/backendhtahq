import React from 'react'
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { makeStyles } from '@material-ui/core/styles';//css
import styles from '../styles/Game.styles';//css
import { useItem } from '../hooks/GameHook';
import CustomCard from "@/components/Card/Card";
import { Link } from "react-router-dom";
import { formatDate } from "@/app/utils/dataService"
import Function from "@/app/Modules/Function/components/Function";
import InputText from "@/components/Input/InputText"
import { useSelector } from "react-redux"

const useStyles = makeStyles(styles);///

const Game = (props) => {
    const { t } = useTranslation()
    const classes = useStyles();
    const { submitFailed, history, location, initialize, handleSubmit, notification } = props;



    const {
        messages,
        text,
        room,
        result,
        disable,
        game,
        endGame,
        time,
        word,
        handleChange,
        updateData,
        replay,
        onRemovePlayer,
        onStartGame
    } = useItem({ history, location, notification })
    const currentUser = useSelector((state) => state.authService.user)
    const conditonTypeWord = () => {
        if (game.id == 0) return true
        if (game.playerOrder.length > 0
            && game.playerOrder[0].playerId != currentUser.Id) {
            return true
        }
        return false
    }

    const notiText = () => {
        if (game.playerOrder.length > 0 && currentUser.Id != game.playerOrder[0].playerId) {
            return ""
        }
        switch (result.isCorrect) {
            case "true": return "Chính xác";
            case "wordExisted": return "Từ này đã được sử dụng";
            case "timeOut": return "Hết thời gian";
            case "false": return "Chưa chính xác";
            default: return result.isCorrect;
        }
    }
    return (
        <>
            <Grid item xs={12} align="right">
                {room.players && room.players.length > 0 && currentUser.Id == room.players[0].playerId && game.id == 0 && <Button className={classes.button} variant="contained" color="primary" onClick={onStartGame} startIcon={<Icon>two_wheeler</Icon>}>
                    {t("Bắt đầu chơi")}
                </Button>}
                <Button className={classes.button} variant="outlined" color="primary" onClick={() => history.push('/game/danhsachphong')} startIcon={<Icon>arrow_back</Icon>}>
                    {t("Trở về")}
                </Button>
            </Grid>
            <Grid container item xs={12} >
                <Grid item xs={4}>
                    <Paper style={{ paddingLeft: 20, paddingRight: 20, margin: 10 }}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <ListItemText>
                                    {t("Chủ phòng")}
                                </ListItemText>
                                <ListItemText style={{ textAlign: "right" }} primary={room.players && room.players.length > 0 && room.players[0].playerName} />
                            </ListItem>
                            {game.id == 0 && <ListItem>
                                <ListItemText>
                                    {t("Số người trong phòng")}
                                </ListItemText>
                                <ListItemText style={{ textAlign: "right" }} primary={room.players.length} />
                            </ListItem>}
                            <ListItem>
                                <ListItemText>
                                    {t("Người chơi hiện tại")}
                                </ListItemText>
                                <ListItemText style={{ textAlign: "right" }} primary={(game.playerOrder.length > 0
                                    && game.playerOrder[0].playerName) || ""} />
                            </ListItem>
                            <ListItem>
                                <ListItemText>
                                    {t("Người chơi tiếp theo")}
                                </ListItemText>
                                <ListItemText style={{ textAlign: "right" }} primary={(game.playerOrder.length > 1
                                    && game.playerOrder[1].playerName) || ""} />
                            </ListItem>
                            {/* <ListItem>
                                <ListItemText>
                                    {t("Số người chơi đã bị loại")}
                                </ListItemText>
                                <ListItemText style={{ textAlign: "right" }} primary={result.eliminatedPlayerId || 0} />
                            </ListItem> */}
                            {(game.id == 0 ? room.players : game.playerOrder).map(player => (
                                <ListItem key={player.playerId}>
                                    <ListItemIcon>
                                        <Icon>person</Icon>
                                    </ListItemIcon>
                                    <ListItemText>
                                        {player.playerName}
                                    </ListItemText>
                                    {currentUser.Id == room.owner.Id && currentUser.Id != player.playerId && (
                                        <ListItemIcon >
                                            <Button onClick={onRemovePlayer.bind(this, player.playerId)}><Icon>close</Icon></Button>
                                        </ListItemIcon>
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={8} align="center">
                    <Box border={1} className={classes.box}>
                        <Paper className={classes.paper}>
                            <Grid container>
                                <Grid item xs={12} alignItems="center" container spacing={2} className={classes.chatbox} justify="center">
                                    {result.isPlaying && game.id != 0 &&
                                        <Grid item xs={12} sm={12}>
                                            <Typography variant="h4" color="secondary">
                                                {time > 0 ? (t("Thời gian còn lại") + `: ${time}`) : "Trò chơi kết thúc"}
                                            </Typography>
                                        </Grid>}
                                    {!result.isPlaying && game.id != 0 && (
                                        !endGame.IsFinish ? <Grid item xs={12} sm={6}>
                                            <Typography variant="h5" align="center" color={result.isCorrect == "true" ? "primary" : "secondary"}>
                                                {t(notiText())}
                                            </Typography>
                                            <Typography variant="h5" align="center">
                                                {t("Người chơi tiếp theo")}: {result.nextPlayer}
                                            </Typography>
                                            <Typography variant="h5" align="center">
                                                {t("Số người chơi đã bị loại")}: {result.eliminatedPlayerId}
                                            </Typography>
                                        </Grid> :
                                            <Grid item xs={12} sm={6}>
                                                <Typography variant="h4" align="center" color="secondary">
                                                    {t("Trò chơi kết thúc")}
                                                </Typography>
                                                <Typography variant="h5" align="center">
                                                    {t("Người chiến thắng")}: {endGame.Winner}
                                                </Typography>
                                            </Grid>
                                    )}
                                    {game.id == 0 && "Vui lòng chờ chủ phòng bắt đầu trờ chơi..."}
                                    {result.isPlaying && game.id > 0 &&
                                        <Grid item xs={12} sm={6}>
                                            <div style={{ minWidth: 50, margin: 20 }}>
                                                <Paper className={classes.message} >
                                                    <Typography variant="h4" align="center">
                                                        {game.currentWord.slice(0, -1)}
                                                        <span style={{ color: "red" }}>{game.currentWord.charAt(game.currentWord.length - 1)}</span>
                                                    </Typography>
                                                </Paper>
                                            </div>
                                        </Grid>
                                    }
                                    {result.isPlaying && game.id > 0 && <Grid item xs={12}>
                                        <div style={{ minWidth: 50, margin: 20 }}>
                                            {word.Description}
                                        </div>
                                    </Grid>
                                    }
                                </Grid>
                                <Grid item xs={12} container alignItems="flex-end">
                                    <Grid item xs={12} sm={10}>
                                        <InputText inputRef={input => input && input.focus()} disabled={conditonTypeWord()} onKeyDown={updateData} fullWidth value={text} onChange={handleChange} variant="outlined" className={classes.input} placeholder={t("Nhập từ")} />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button onClick={updateData} style={{ marginBottom: 5 }} color="primary" variant="contained" startIcon={<Icon>send</Icon>}>{t("Gửi")}</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}



export default Game