import React from 'react'
import { Field, reduxForm } from "redux-form";
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';


// import RenderTextField from "@/components/ReduxFormField/TextField";
import RenderSelectField from "@/components/ReduxFormField/SelectField";
import RenderCheckboxField from "@/components/ReduxFormField/CheckboxField";
// import { makeStyles } from '@material-ui/core/styles';//css
// import styles from '../styles/Login.style';//css

// const useStyles = makeStyles(styles);///

const Route = (props) => {
    const { t } = useTranslation()
    // const classes = useStyles();///
    const Dates = [
        { Name: t("Thứ hai"), value: 2 },
        { Name: t("Thứ ba"), value: 3 },
        { Name: t("Thứ tư"), value: 4 },
        { Name: t("Thứ năm"), value: 5 },
        { Name: t("Thứ sáu"), value: 6 },
        { Name: t("Thứ bảy"), value: 7 },
        { Name: t("Chủ nhật"), value: 8 },
    ]
    const Times = [
        { Name: t("6.00"), value: 2 },
        { Name: t("7.00"), value: 3 },
        { Name: t("8.00"), value: 4 },
    ]
    const actions = [
        { Name: t("Học từ vựng mới"), value: 1 },
        { Name: t("Ôn từ vựng"), value: 2 },
        { Name: t("Nghe"), value: 3 },
        { Name: t("Xem video"), value: 4 },
        { Name: t("Làm bài test"), value: 5 },
    ]
    return <form noValidate>
        <Paper style={{ marginLeft: 200, marginRight: 200 }}>
            <Grid container justify="center" spacing={2} style={{ padding: 20 }}>
                <Grid item xs={12}>
                    <Typography variant="h6" color="secondary">
                        {t("Đặt lộ trình")}
                    </Typography>

                </Grid>
                <Grid item xs={12} container justify='center' spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Field
                            name="Time"
                            dataText="Name"
                            label={t("Ngày")}
                            dataValue="value"
                            dataSource={Dates}
                            component={RenderSelectField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Field
                            name="Hour"
                            label={t("Thời gian bắt đầu")}
                            dataText="Name"
                            dataValue="value"
                            dataSource={Times}
                            component={RenderSelectField}
                        />
                    </Grid>
                    {actions.map((x, i) => (
                        <Grid key={i} item xs={12} container justify="center">
                            <Grid item xs={12} sm={6} align="left"><Typography variant="body1">{x.Name}</Typography></Grid>
                            <Grid item xs={12} sm={6} align='right'>
                                <Field
                                    name={`Action${i}`}
                                    component={RenderCheckboxField}
                                />
                            </Grid>
                        </Grid>
                    ))}

                    <Grid item xs={12} container>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" startIcon={<Icon>delete</Icon>} color="secondary">{t("Huỷ")}</Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" startIcon={<Icon>save</Icon>} color="primary">{t("Lưu")}</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Paper>
    </form>
}

export default reduxForm({
    form: "RouteForm"
})(Route);