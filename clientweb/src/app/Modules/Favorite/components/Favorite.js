import React from 'react'
import { useTranslation } from "react-i18next";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';

import { makeStyles } from '@material-ui/core/styles';//css
import styles from '../styles/Favorite.style';//css
import { useItem } from '../hooks/FavoriteHook';
import CustomCard from "@/components/Card/Card";
import { Link } from "react-router-dom";
import Function from "@/app/Modules/Function/components/Function";

const useStyles = makeStyles(styles);///

const Favorite = (props) => {
    const { t } = useTranslation()
    const classes = useStyles();
    const { submitFailed, location, initialize, history, handleSubmit, notification } = props;

    const {
        state,
        data,
        handleChangePage,
        handleChangeRowsPerPage
    } = useItem({ location })

    const { page, rowsPerPage } = state
    const { ListGrid, TotalCount } = data

    return (
        <>
            <Grid item xs={12} align="right">
                <Button className={classes.button} variant="outlined" color="primary" onClick={() => history.goBack()} startIcon={<Icon>arrow_back</Icon>}>
                    {t("Trở về")}
                </Button>
            </Grid>
            <Grid item xs={12} container>
                <Grid item xs={4}>
                    <Function history={history} />
                </Grid>
                <Grid item xs={8}>
                    <CustomCard title={t("Yêu thích")}>
                        <Grid container spacing={2} alignItems="flex-start" justify="flex-end">
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">{t("STT")}</TableCell>
                                        <TableCell>{t("Từ vựng")}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ListGrid.map((x, i) => (
                                        <TableRow key={i} className={classes.columnHover}>
                                            <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                                            <TableCell>
                                                <Link style={{ textDecoration: "none", color: "blue" }} to={{ pathname: "/timkiem", search: `?LanguageTranslate=English&Id=${x.IdWord}` }}>{x.Word}</Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[20, 50, 100]}
                                component="div"
                                count={TotalCount}
                                labelRowsPerPage={t("Số dòng")}
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </Grid>
                    </CustomCard>
                </Grid>
            </Grid>
        </>
    )
}



export default Favorite