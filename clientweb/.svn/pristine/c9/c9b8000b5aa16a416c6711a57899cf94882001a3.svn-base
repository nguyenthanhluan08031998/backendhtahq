import React from 'react';
import Bar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import UserLogin from '../components/UserLogin'
import { useTranslation } from "react-i18next";
import styles from '../styles/AppBar.style';//css
import IconButton from "@material-ui/core/IconButton";
import { LanguageList } from '@/app/utils/Language';
import CustomPopover from "@/components/Popover";
import { makeStyles } from '@material-ui/core/styles';//css
import { Grid } from '@material-ui/core';
import { IpServer, APIPort } from '../../../utils/Port'

import ResponsiveDialog from '../components/ResponsiveDialog'
import { useItem } from '../hooks/AppBarHook';

const useStyles = makeStyles(styles);///{ Child, user, props }
const AppBar = (props) => {
    const { history } = props
    const { open, handleClose, wordTranslate, changeLanguage, onNextToPageLogin,
        openLogin, isCheckTranslate, onButtonTranslate, openButtonTranslate,
        currentUser, onLogout, onChangePassWord
    } = useItem({ history })
    const { t } = useTranslation();
    const classes = useStyles();///

    return (
        // <Grid className={classes.root}>
        <Bar style={{ backgroundColor: "#03A9F4" }}>
            <Toolbar>
                <Grid item xs={12} sm={2}>
                    <IconButton onClick={() => history.push('/home')}>
                        <Avatar className={classes.avatarLogo} alt="Remy Sharp" src={`http://${IpServer}:${APIPort}/image/imgLogo/Untitled Design.png`} />
                    </IconButton>
                    <Button onClick={() => history.push('/home')} variant="text" size="large" style={{ textAlign: 'center' }}><Icon>home</Icon></Button>

                </Grid>
                <Grid item xs={12} sm={6} className={classes.title}>
                    <Typography variant="h6" gutterBottom  >
                        Tiếng Anh Hiệu Quả
                            </Typography>
                </Grid>
                <Grid item xs={12} sm={2} align="right">
                    <CustomPopover content="menu" closeOnClick="true" menuItems={LanguageList.map(x => ({ ...x, onClick: changeLanguage.bind(this, x.Code) }))}>
                        <Button variant="text">{t("Ngôn ngữ")}</Button>
                    </CustomPopover>
                </Grid>
                <UserLogin history={history} onChangePassWord={onChangePassWord} currentUser={currentUser} openLogin={openLogin} onNextToPageLogin={onNextToPageLogin} onLogout={onLogout}></UserLogin>
            </Toolbar>
            <ResponsiveDialog isCheckTranslate={isCheckTranslate} openButtonTranslate={openButtonTranslate} onButtonTranslate={onButtonTranslate} open={open} Word={wordTranslate.Word} Description={wordTranslate.Description} Pronounce={wordTranslate.Pronounce} handleClose={handleClose} />

        </Bar >

    );
}
export default AppBar;