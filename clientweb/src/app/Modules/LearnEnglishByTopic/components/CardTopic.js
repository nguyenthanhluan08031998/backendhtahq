import React from 'react'
import styles from '../styles/CardTopic.style';//css
import { makeStyles } from '@material-ui/core/styles';//css
import { Avatar } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

const useStyles = makeStyles(styles);///
const CardItem = ({ item, selectedTopic, onClickTopic }) => {
    const classes = useStyles();///
    return (
        <ListItem selected={item.Id == selectedTopic} button onClick={onClickTopic.bind(this, item)} >
            <ListItemAvatar style={{ width: "20%" }}><Avatar src={item.Image}></Avatar></ListItemAvatar>
            <ListItemText style={{ width: "20%" }} align='left' primary={item.NameTopic} />
            <ListItemText style={{ width: "60%" }} align='left' primary={item.Translate} />
        </ListItem>
    );

}
export default CardItem;
