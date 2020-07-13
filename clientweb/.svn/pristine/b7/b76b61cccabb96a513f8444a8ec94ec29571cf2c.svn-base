import React from 'react';
import { Grid } from '@material-ui/core';
import TableListTopic from './TableListTopic';
import TableListVocabulary from './TableListVocabulary';
import { useItem } from '../hooks/LearnEnglishByTopicHook';
import { useTranslation } from "react-i18next";
import CustomCard from "@/components/Card/Card";
import { makeStyles } from '@material-ui/core/styles';//css
import styles from '../styles/LearnEnglishByTopic.style';//css
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(styles);///

const LearnEnglishByTopic = (props) => {
    const {
        selectedTopic,
        dataTopic,
        dataVocabulary,
        onClickTopic
    } = useItem();
    const classes = useStyles();
    const { ListGrid, TotalCount } = dataTopic
    const { history, location, notification } = props;
    const { t } = useTranslation();
    // const { listVocabulary, countVocabulary } = dataVocabulary;
    return (
        <>
            <Grid item xs={12} align="right">
                <Button className={classes.button} variant="outlined" color="primary" onClick={() => history.goBack()} startIcon={<Icon>arrow_back</Icon>}>
                    {t("Trở về")}
                </Button>
            </Grid>
            <CustomCard title={t("Danh sách từ vựng theo chủ đề")}>
                <Grid container item xs={12} justify="flex-start" spacing={2}>
                    <Grid item xs={12} sm={5} align='left'>
                        {/* <GridList style={{ width: '420px', height: '500px', transform: 'translateZ(0)', marginTop: 20 }}> */}
                        <TableListTopic datas={ListGrid} selectedTopic={selectedTopic} onClickTopic={onClickTopic}></TableListTopic>
                        {/* </GridList> */}
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        {/* <GridList style={{ height: '500px', transform: 'translateZ(0)', marginTop: 20 }}> */}
                        <TableListVocabulary dataVocabulary={dataVocabulary}></TableListVocabulary>
                        {/* </GridList> */}
                    </Grid>
                </Grid>

            </CustomCard>
        </>
    )
}
export default LearnEnglishByTopic;