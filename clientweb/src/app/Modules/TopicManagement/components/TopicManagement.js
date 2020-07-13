import React from 'react'
import { Field, reduxForm } from "redux-form";
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from '@material-ui/core/Icon';

import RenderTextField from "@/components/ReduxFormField/TextField";
import RenderEditorField from "@/components/ReduxFormField/InputEditorField";
import RenderCheckboxField from "@/components/ReduxFormField/CheckboxField";
import TopicList from "./TopicList";
import RenderSelectField from "@/components/ReduxFormField/SelectField";
import { makeStyles } from '@material-ui/core/styles';//css
import styles from '../styles/TopicManagement.style';//css
import { useItem } from '../hooks/TopicManagementHook';
import { checkExist } from "../services/TopicManagementAPI";
import CustomCard from "@/components/Card/Card";

const useStyles = makeStyles(styles);///

const TopicManagement = (props) => {
    const { t } = useTranslation()
    const classes = useStyles();
    const { submitFailed, history, location, initialize, handleSubmit, notification } = props;

    const {
        state,
        data,
        onSelect,
        item,
        editorChange,
        addOrUpdate,
        addNew,
        handleChangePage,
        handleChangeRowsPerPage,
        dictionaryOptions,
        onInputChange
    } = useItem({ history, location, notification })


    React.useEffect(() => {
        if (submitFailed) {
            notification("Vui lòng nhập thông tin hợp lệ", "error");
        }
    }, [submitFailed]);


    React.useEffect(() => {
        initialize({ ...item })
    }, [item]) // eslint-disable-line react-hooks/exhaustive-deps
    return <form noValidate>
        <Grid item xs={12} align="right">
            <Button className={classes.button} variant="contained" color="primary" onClick={addNew} startIcon={<Icon>add</Icon>}>
                {t("Thêm mới")}
            </Button>
            <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmit(addOrUpdate)} startIcon={<Icon>save</Icon>}>
                {t("Lưu")}
            </Button>
            <Button className={classes.button} variant="outlined" color="primary" onClick={() => history.goBack()} startIcon={<Icon>arrow_back</Icon>}>
                {t("Trở về")}
            </Button>
        </Grid>
        <CustomCard title={t("Quản lí từ điển")}>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" color="primary">
                        {t("Danh sách Chủ đề")}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" color="primary">
                        {t("Quản lí chủ đề")}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper>
                        <TopicList
                            page={state.page}
                            rowsPerPage={state.rowsPerPage}
                            data={data}
                            onSelect={onSelect}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper style={{ padding: 10 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Field
                                    required
                                    name="NameTopic"
                                    label={t("Tên chủ đề")}
                                    component={RenderTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    multiline
                                    name="Translate"
                                    label={t("Dịch nghĩa")}
                                    component={RenderTextField}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                            <Field
                                multiple
                                name="IdWords"
                                dataValue="Id"
                                dataText="Word"
                                dataSource={dictionaryOptions}
                                onInputChange={onInputChange}
                                label={t("Danh sách từ vựng")}
                                component={RenderSelectField}
                            />
                        </Grid> */}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </CustomCard>
    </form>

}
function validate(values) {
    const errors = {};
    //Khai báo mảng các field ứng với name đã đặt ở form
    const requiredFields = ["NameTopic"];
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = "Thông tin bắt buộc";
        }
        if (values[field] && !values[field].toString().trim()) errors[field] = "Không nhập khoảng trống";
    });
    return errors;
}

async function asyncValidate(values) {
    let isExist = await checkExist(values.NameTopic.trim(), values.Id);
    if (isExist && isExist.exist) {
        let error = { NameTopic: "Từ này đã có trong từ điển" };
        throw error;
    }
}
export default reduxForm({
    form: "TopicManagementForm",
    validate,
    // asyncValidate
})(TopicManagement);