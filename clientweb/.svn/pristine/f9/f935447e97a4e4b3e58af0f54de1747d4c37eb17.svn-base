import React from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import styles from '../styles/Home.style';//css
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';//css
import { Grid } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { IpServer, APIPort } from '../../../utils/Port'

const useStyles = makeStyles(styles);///
const CardItem = ({ img, name, goToPage, props }) => {
    const { t } = useTranslation()
    const classes = useStyles();///
    return (
        <Grid onClick={goToPage} item xs={12} sm={3} container justify="center" alignItems="center">
            <Card className={classes.rootCard} variant="outlined" style={{ cursor: 'pointer' }}>
                <Grid container item xs={12}>
                    <Grid item xs={12} style={{ borderColor: "blue" }} >
                        <CardMedia
                            className={classes.media}
                            image={`http://${IpServer}:${APIPort}${img}`}
                            title="Paella dish"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CardContent>
                            <Typography variant="h6" color="primary" component="p">
                                {t(name)}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>


            </Card>
        </Grid>
    );

}
export default CardItem;
