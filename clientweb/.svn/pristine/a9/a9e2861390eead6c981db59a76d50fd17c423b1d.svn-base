import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";
import styles from '../styles/Home.style';//css
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AutoComplete from "@/components/Input/MuiAutoComplete";
import { LanguageList } from '@/app/utils/Language';
const useStyles = makeStyles(styles);///
function Search(props) {
    const classes = useStyles()
    const { t } = useTranslation()
    const {
        data,
        textSearch,
        onSearch,
        onChangeSearch,
        dictionaryOptions,
        onInputChange,
        onKeyPress,
        languageSelect,
        onChangeLanguageSelect,
    } = props
    //const [onSearch]
    return (
        <Grid item xs={12} container>
            <Grid item xs={12} sm={2} align="right" style={{ paddingRight: 5 }}>
                <AutoComplete
                    disableClearable
                    className={classes.autoCompleteLanguage}
                    variant="outlined"
                    dataText="title"
                    dataValue="title"
                    dataSource={LanguageList}
                    onChange={onChangeLanguageSelect}
                    value={languageSelect}
                ></AutoComplete>
            </Grid>
            <Grid item xs={12} sm={9}>
                <AutoComplete
                    style={{ border: 3 }}
                    className={classes.rootSearch}
                    variant="outlined"
                    dataSource={dictionaryOptions}
                    onChange={onChangeSearch}
                    onInputChange={onInputChange}
                    dataText="Word"
                    dataValue="Word"
                    value={textSearch}
                    onKeyPress={onKeyPress}
                />
            </Grid>
            <Grid item xs={12} sm={1} align="right">
                <IconButton className={classes.searchIcon} onClick={onSearch} aria-label="search">
                    <Icon className={classes.icon}>search</Icon>
                </IconButton>
            </Grid>
        </Grid>
    );
}
export default Search;