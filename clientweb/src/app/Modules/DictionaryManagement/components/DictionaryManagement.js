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
import RenderSelectField from "@/components/ReduxFormField/SelectField";
import TextField from "@/components/Input/InputText";
// import RenderCheckboxField from "@/components/ReduxFormField/CheckboxField";
import DictionaryList from "./DictionaryList";
import InputAdornment from '@material-ui/core/InputAdornment';

import { makeStyles } from '@material-ui/core/styles';//css
import styles from '../styles/DictionaryManagement.style';//css
import { useItem } from '../hooks/DictionaryManagementHook';
import CustomCard from "@/components/Card/Card";
import { checkExist } from "../services/DictionaryManagementAPI";

const useStyles = makeStyles(styles);///

const DictionaryManagement = (props) => {
    const { t } = useTranslation()
    const classes = useStyles();
    const { submitFailed, history, location, initialize, handleSubmit, notification } = props;
    const {
        state,
        data,
        textSearch,
        onSelect,
        item,
        editorChange,
        addOrUpdate,
        addNew,
        handleChangePage,
        handleChangeRowsPerPage,
        TopicOptions,
        onSearch,
        onKeyPress
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
            <TextField
                className={classes.button}
                placeholder={t("Tìm kiếm")}
                value={textSearch}
                onChange={onSearch}
                onKeyPress={onKeyPress}
                variant="outlined"
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end" onClick={onKeyPress} style={{ cursor: 'pointer' }}>
                            <Icon>search</Icon>
                        </InputAdornment>
                }}
            />
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
                        {t("Danh sách từ điển")}
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" color="primary">
                        {t("Quản lí từ điển")}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Paper>
                        <DictionaryList
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
                                    name="Word"
                                    label={t("Từ vựng")}
                                    component={RenderTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    multiline
                                    name="Pronounce"
                                    label={t("Phát âm")}
                                    component={RenderTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    multiple
                                    name="IdTopic"
                                    label={t("Chủ đề")}
                                    dataText="NameTopic"
                                    dataValue="Id"
                                    dataSource={TopicOptions}
                                    component={RenderSelectField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    multiline
                                    name="Description"
                                    label={t("Mô tả")}
                                    component={RenderTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="YoutubeLink"
                                    label={t("Link Youtube")}
                                    component={RenderTextField}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Field
                                    name="Html"
                                    label={t("Diễn giải")}
                                    component={RenderEditorField}
                                    onExecute={editorChange}
                                />
                            </Grid>
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
    const requiredFields = ["Word"];
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = "Thông tin bắt buộc";
        }
        if (values[field] && !values[field].toString().trim()) errors[field] = "Không nhập khoảng trống";
    });
    return errors;
}

async function asyncValidate(values) {
    let isExist = await checkExist(values.Word.trim(), values.Id);
    if (isExist && isExist.exist) {
        let error = { Word: "Từ này đã có trong từ điển" };
        throw error;
    }
}

export default reduxForm({
    form: "DictionaryManagementForm",
    validate,
    asyncValidate
})(DictionaryManagement);