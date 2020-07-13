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

import RenderTextField from "@/components/ReduxFormField/TextField";
import RenderNumberField from "@/components/ReduxFormField/NumberField";
import RenderSelectField from "@/components/ReduxFormField/SelectField";

const useStyles = makeStyles(styles);///
const selector = formValueSelector("CreateRoomForm");

const renderSwitch = React.memo(({ label, input, ...custom }) => {
    return (
        <FormControlLabel
            style={{ margin: 0 }}
            control={
                <Switch
                    checked={Boolean(input.value)}
                    onChange={(e) => (input.onChange(e.target.checked))}
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
            label={label}
            labelPlacement="start"
            {...custom}
        />
    )
})

const CreateRoom = (props) => {
    const { t } = useTranslation()
    const classes = useStyles();
    const IsPassword = useSelector((state) => selector(state, "IsPassword"));
    const { submitFailed, history, location, initialize, handleSubmit, notification } = props;



    const {
        item,
        creatRoom
    } = useItem({ history, location, notification, t })
    React.useEffect(() => {
        initialize({ ...item })
    }, [item]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <form noValidate>
            <Grid item xs={12} align="right">
                <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit(creatRoom)} startIcon={<Icon>save</Icon>}>
                    {t("Lưu")}
                </Button>
                <Button className={classes.button} variant="outlined" color="primary" onClick={() => history.goBack()} startIcon={<Icon>arrow_back</Icon>}>
                    {t("Trở về")}
                </Button>
            </Grid>
            <Grid container item xs={12} >
                <Grid item xs={4}>
                    <Function history={history} />
                </Grid>
                <Grid item xs={8} align="center">
                    <CustomCard title={t("Tạo phòng")}>
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    name="Name"
                                    label={t("Tên phòng chơi")}
                                    component={RenderTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="IsPassword"
                                    label={t("Mật khẩu")}
                                    component={renderSwitch}
                                />
                            </Grid>
                            {IsPassword && <Grid item xs={12}>
                                <Field
                                    name="Password"
                                    type="password"
                                    label={t("Mật khẩu")}
                                    component={RenderTextField}
                                />
                            </Grid>}
                            <Grid item xs={12}>
                                <Field
                                    name="PlayerNumber"
                                    label={t("Số người chơi")}
                                    dataText="Id"
                                    dataSource={[{ Id: 2 }, { Id: 3 }, { Id: 4 }, { Id: 5 }]}
                                    component={RenderSelectField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="Time"
                                    label={t("Thời gian ghi đáp án")}
                                    component={RenderNumberField}
                                />
                            </Grid>
                        </Grid>
                    </CustomCard>
                </Grid>
            </Grid>
        </form>
    )
}



export default reduxForm({
    form: "CreateRoomForm",
    // validate,
    // asyncValidate
})(CreateRoom);