import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 10,
        textAlign: "left",
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    header: {
        backgroundColor: "#0371ea",
        color: "white",
        maxHeight: 10
    }
});

export default function SimpleCard(props) {
    const classes = useStyles();
    const {
        title,
        children
    } = props
    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.header}
                title={
                    <Typography variant="h6">
                        {title || ""}
                    </Typography>
                }
            />
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}
