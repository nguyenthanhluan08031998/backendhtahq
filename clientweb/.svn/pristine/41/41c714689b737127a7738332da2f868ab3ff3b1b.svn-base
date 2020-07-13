import React from 'react';
import { useTranslation } from "react-i18next";

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useItem } from '../hooks/FunctionHook';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { IpServer, APIPort } from '../../../utils/Port'

const Fucntion = (props) => {
    const { t } = useTranslation()

    const { submitFailes, history, location, initialize, handleSubmit, notification } = props
    const {
        data,
        goToPage,
    } = useItem({ history })
    return (
        <Paper style={{ paddingLeft: 20, paddingRight: 20, margin: 10 }}>
            <List component="nav" aria-label="main mailbox folders">
                {
                    data.map((item, i) => (
                        <ListItem key={i} button onClick={goToPage.bind(this, item.Link)}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={`http://${IpServer}:${APIPort}${item.Image}`} />
                            </ListItemAvatar>
                            <ListItemText primary={t(item.Name)} />
                        </ListItem>
                    ))
                }
            </List>

        </Paper >
    )
}

export default Fucntion;



