import React from 'react';
import { useTranslation } from "react-i18next";

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";

import styles from '../styles/Settings.style';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux"

const useStyles = makeStyles(styles);

const RemindList = (props) => {
    const classes = useStyles();

    const { t } = useTranslation()
    const { data, selectedTopic, selectTypeRemind } = props
    return (
        <Paper>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>{t("Số từ")}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((x, i) => (
                        <TableRow key={i} className={classes.columnHover} >
                            <TableCell>
                                <Typography color={x.Id == -1 ? "secondary" : x.Id == -2 ? "primary" : "initial"}>
                                    {t(x.NameTopic)}
                                </Typography>
                            </TableCell>
                            <TableCell>{x.NumberWord}</TableCell>
                            <TableCell padding="checkbox">
                                <Checkbox checked={x.Id == selectedTopic} onChange={selectTypeRemind.bind(this, x.Id)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Paper>
    )
}
export default RemindList;