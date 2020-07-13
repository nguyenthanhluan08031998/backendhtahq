import React from 'react'
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";

import { useTranslation } from "react-i18next";
import { withTranslation } from "react-i18next";

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import RenderTextField from "@/components/ReduxFormField/TextField";
import { makeStyles } from '@material-ui/core/styles';//css
import styles from '../styles/Login.style';//css
import FaceBookIcon from '@/app/utils/img/Facebook.png'
import GoogleIcon from '@/app/utils/img/Google.png'
import withStyles from "@material-ui/core/styles/withStyles";
import { buildUserInfo } from "@/store/redux/auth/authActions"
import Dialog from '@material-ui/core/Dialog';
import Icon from '@material-ui/core/Icon';

import { useItem } from "../hooks/LoginHook"
const useStyles = makeStyles(styles);///

const Login = (props) => {
    const { t } = useTranslation()
    const classes = useStyles();///

    const responseGoogle = (response) => {
        // console.log(response);
    }
    const responseFacebook = (response) => {
        // console.log(response);
    }
    const { history, buildUserInfo, handleSubmit, notification } = props;
    const {
        checkLogin
    } = useItem({ history, notification, buildUserInfo })


    return <form noValidate>
        <Dialog fullWidth aria-labelledby="customized-dialog-title" onClose={() => history.push(`/home`)} open={true}>
            <Grid container justify="center">
                <Grid item xs={12}>
                    <Paper style={{ padding: 20 }}>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={12} sm={8} style={{ textAlign: 'right' }}>
                                <Typography variant="h4" color="error">{t("Đăng nhập")}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={4} align="right">
                                <Icon onClick={() => history.push(`/home`)} style={{ cursor: "pointer" }}>close</Icon>
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="Email"
                                    label="Email"
                                    component={RenderTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="Password"
                                    type="password"
                                    label="Password"
                                    component={RenderTextField}
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button variant="contained" color="primary" onClick={handleSubmit(checkLogin)}>{t("Đăng nhập")}</Button>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button variant="text" color="primary" onClick={() => history.push('/forgotPassword')}>{t("Quên mật khẩu")}</Button>
                            </Grid>
                            {/* <Grid item xs={12}>
                            <Typography variant="body1">{t("Hoặc")}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <GoogleLogin
                            // clientId="goog"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <Button
                                    className={classes.login}
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<img alt="googleImage" style={{ width: 30 }} src={GoogleIcon}></img>}
                                    variant="contained"
                                // color="inherit"

                                >
                                    {t("Đăng nhập bằng Google")}
                                </Button>
                            )}
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FacebookLogin
                            appId=""
                            fields="name,email,picture"
                            render={renderProps => (
                                <Button
                                    className={classes.login}
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    startIcon={<img alt="FacebookImage" style={{ width: 30 }} src={FaceBookIcon}></img>}
                                    variant="contained"
                                // color="inherit"
                                >
                                    {t("Đăng nhập bằng Facebook")}
                                </Button>
                            )}
                            onClick={() => { }}
                            callback={responseFacebook}
                        />
                        </Grid> */}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Dialog>
    </form>
}

const mapStateToProps = (state) => {
    return {
        user: state.authService.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        buildUserInfo: (data) => dispatch(buildUserInfo(data)),
    };
};

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withTranslation(),
    withStyles(styles),
    reduxForm({
        form: "LoginForm", // a unique identifier for this form
        //    validate
    })
);

export default enhance(Login);