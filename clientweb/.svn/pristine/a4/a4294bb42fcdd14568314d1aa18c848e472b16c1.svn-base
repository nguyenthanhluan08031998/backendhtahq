import React from 'react';
import Paper from '@material-ui/core/Paper';
import CardTopic from './CardTopic';
import { Card, Grid } from '@material-ui/core';
import List from '@material-ui/core/List';

export default function TableListTopic({ datas, onClickTopic, selectedTopic }) {
  return (
    <Paper style={{ paddingTop: 5 }}>
      {datas.map((item, i) => (
        <List key={i} component="nav" aria-label="main mailbox folders">
          <CardTopic item={item} selectedTopic={selectedTopic} onClickTopic={onClickTopic.bind(this, item)}>
          </CardTopic>
        </List>
      ))}
    </Paper>
  )
}