import React from 'react';
import { Field, reduxForm, formValueSelector } from "redux-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';



import RenderTimePickerField from "@/components/ReduxFormField/TimePickerField";
import RenderCheckboxField from "@/components/ReduxFormField/CheckboxField";
import RenderNumberField from "@/components/ReduxFormField/NumberField";
import RemindView from "./RemindWords";
import { useItem } from "../hooks/SettingsHook";

import styles from '../styles/Settings.style';
import { makeStyles } from '@material-ui/core/styles';
import CustomCard from "@/components/Card/Card";
import CustomDialog from "./Dialog";
import Function from "@/app/Modules/Function/components/Function";

import BrowserNotification from "react-web-notification";
const selector = formValueSelector("SettingsForm");

const useStyles = makeStyles(styles);



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


const Settings = (props) => {
    const classes = useStyles();
    const { t } = useTranslation()
    const { history, location, initialize, handleSubmit, notification, swRegistration } = props;
    const {
        item,
        selectedTopic,
        RemindList,
        addOrUpdate,
        selectTypeRemind,
        RemindWordListView,
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        open,
        handleClose,
        viewList
    } = useItem({ history, location, notification, swRegistration, t })
    const [data, setData] = React.useState({ ListGrid: [], TotalCount: 0 })

    React.useEffect(() => {
        initialize({ ...item })
    }, [item])

    React.useEffect(() => {
        if (open && (selectedTopic > 0 || selectedTopic == -1)) {
            setData(pre => ({
                ListGrid: viewList.ListGrid.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
                TotalCount: viewList.TotalCount
            }))
        }
        else {
            setData(viewList)
        }
    }, [page, rowsPerPage, open, selectedTopic])
    return (
        <form noValidate>
            <Grid item align="right">
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    startIcon={<Icon>save</Icon>}
                    type="submit"
                    onClick={handleSubmit(addOrUpdate)}
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
                    <CustomCard title={t("Cài đặt")}>
                        <Grid container spacing={2} justify="center">
                            <Grid item xs={12} container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        name="TurnOnOff"
                                        label={t("Bật nhắc nhở từ vựng")}
                                        component={renderSwitch}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="NumberWordOnDay"
                                        label={t("Số từ/Ngày")}
                                        component={RenderNumberField}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        required
                                        name="TimeStartRemind"
                                        label={t("Thời gian nhắc bắt đầu")}
                                        component={RenderTimePickerField}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        required
                                        name="TimeStopRemind"
                                        label={t("Kết thúc")}
                                        component={RenderTimePickerField}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {t("Chọn từ nhắc nhở")}
                                </Grid>
                                <Grid item xs={12}>
                                    <RemindView
                                        data={RemindList}
                                        selectedTopic={selectedTopic}
                                        selectTypeRemind={selectTypeRemind}
                                    />
                                </Grid>
                                <Grid item xs={12} align="center">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={RemindWordListView}
                                    >{t("Danh sách các từ đã chọn")}</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CustomCard>
                </Grid>
            </Grid>
            <CustomDialog
                handleClose={handleClose}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                data={data}
                page={page}
                rowsPerPage={rowsPerPage}
                open={open}
            />
        </form >
    );

}
function validate(values) {
    const errors = {};
    //Khai báo mảng các field ứng với name đã đặt ở form
    if (values.TurnOnOff) {
        const requiredFields = ["TimeStartRemind", "TimeStopRemind", "NumberWordOnDay"];
        requiredFields.forEach((field) => {
            if (!values[field]) {
                errors[field] = "Thông tin bắt buộc";
            }
            if (values[field] && !values[field].toString().trim()) errors[field] = "Không nhập khoảng trống";
        });
    }
    return errors;
}

export default reduxForm({
    form: "SettingsForm",
    validate
})(Settings);
