import React from 'react'
import { useTranslation } from "react-i18next";

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';

import { makeStyles } from '@material-ui/core/styles';//css
import styles from '../styles/TopicManagement.style';//css

const useStyles = makeStyles(styles);///

const TopicList = ({ data, onSelect, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
    const { t } = useTranslation()
    const classes = useStyles();

    const { ListGrid, TotalCount } = data

    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">{t("STT")}</TableCell>
                        <TableCell>{t("Chủ đề")}</TableCell>
                        <TableCell>{t("Dịch nghĩa")}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ListGrid.map((x, i) => (
                        <TableRow key={i} className={classes.columnHover} onClick={onSelect.bind(this, x, i)}>
                            <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                            <TableCell>{x.NameTopic}</TableCell>
                            <TableCell>{x.Translate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={TotalCount}
                labelRowsPerPage={t("Số dòng")}
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    )
}
export default TopicList;