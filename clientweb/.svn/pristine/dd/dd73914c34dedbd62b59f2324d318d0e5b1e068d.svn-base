import React from 'react';
import { useTranslation } from "react-i18next";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function TableListVocabulary({ dataVocabulary }) {
  const { t } = useTranslation()

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("Từ vựng")}</TableCell>
            <TableCell>{t("Phiên âm")}</TableCell>
            <TableCell>{t("Mô tả")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataVocabulary.map((item, i) => (
            <TableRow key={i}>
              <TableCell >
                {item.Word}
              </TableCell>
              <TableCell >
                {item.Pronounce}
              </TableCell>
              <TableCell>
                {item.Description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}