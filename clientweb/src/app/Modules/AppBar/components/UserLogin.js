import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import styles from '../styles/AppBar.style';//css
import { useTranslation } from "react-i18next";
import { makeStyles } from '@material-ui/core/styles';//css
import Popover from '@material-ui/core/Popover';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';

const useStyles = makeStyles(styles);///

const UserLogin = (props) => {
    const { openLogin, onNextToPageLogin, onChangePassWord, currentUser, onLogout, history } = props
    const { t } = useTranslation()
    const classes = useStyles();///
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        console.log("yoooo")
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    if (openLogin == true) {
        return (
            <Grid item xs={12} sm={2}>
                <IconButton size="small" onClick={handleClick} >
                    <Avatar alt="Remy Sharp" options={currentUser} src={currentUser.Image} className={classes.avatar} />
                    <Typography style={{ marginLeft: "2px" }} variant="body1" color="primary">
                        {currentUser.Name}
                    </Typography>
                </IconButton>
                <Popover
                    id={id}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItem button onClick={onChangePassWord}>
                            <ListItemAvatar>
                                <Icon>face</Icon>
                            </ListItemAvatar>
                            <ListItemText>
                                {t("Tài khoản")}
                            </ListItemText>
                        </ListItem>

                        <ListItem button onClick={onChangePassWord}>
                            <ListItemAvatar>
                                <Icon>fingerprint</Icon>
                            </ListItemAvatar>
                            <ListItemText>
                                {t("Đổi mật khẩu")}
                            </ListItemText>
                        </ListItem>
                        <ListItem button onClick={onLogout}>
                            <ListItemAvatar>
                                <Icon>login</Icon>
                            </ListItemAvatar>
                            <ListItemText>
                                {t("Đăng xuất")}
                            </ListItemText>
                        </ListItem>
                    </List>

                </Popover>
            </Grid>
        );
    }
    if (openLogin == false) {
        return (
            <Grid item xs={12} sm={2}>
                <Button variant="text" color="inherit" className={classes.button} onClick={onNextToPageLogin}>{t("ĐĂNG NHẬP")}</Button>
                <Button variant="text" color="inherit" onClick={() => history.push('/dangki')}>{t("ĐĂNG KÍ")}</Button>
            </Grid>
        )
    }
}
export default UserLogin;