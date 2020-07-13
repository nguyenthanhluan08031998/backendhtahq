import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import StarTwoToneIcon from '@material-ui/icons/Favorite';
import styles from '../styles/WordSearch.style';//css;
import Search from "@/app/Modules/Home/components/Search"
import { useItem } from '../hooks/WordSearchHook'
import { Paper, DialogTitle } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Avatar from '@material-ui/core/Avatar';
import Function from "@/app/Modules/Function/components/Function";
import CardMedia from '@material-ui/core/CardMedia';
import { useTranslation } from "react-i18next";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles(styles);///
const WordSearch = (props) => {
    const { t } = useTranslation()
    const { history, location, notification } = props
    const {
        textSearch,
        onSearch,
        onChangeSearch,
        wordItem,
        onButtonAddWordLike,
        color,
        onGoBack,
        onSpeak,
        dictionaryOptions,
        onKeyPress,
        onInputChange,
        onGoHome,
        languageSelect,
        onChangeLanguageSelect,
        disableStar
    } = useItem({ history, location, notification })
    //const data = wordItem
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)

    const getYoutubeId = (url) => {
        return url
    }

    return (
        <Grid container>

            {/* <Grid item xs={12} xs={6}align='left' className={classes.buttonBack}>
                <Button onClick={onGoBack} variant="outlined" startIcon={<Icon>arrow_back</Icon>}>Trở về</Button>
                <Button onClick={onGoHome} variant="outlined" startIcon={<Icon>home</Icon>}>Trang chủ</Button>
            </Grid> */}
            <Grid item xs={12} align="right" sm={11}>
                <Grid item xs={10}>
                    <Search
                        languageSelect={languageSelect} onChangeLanguageSelect={onChangeLanguageSelect}
                        textSearch={textSearch} onSearch={onSearch}
                        onChangeSearch={onChangeSearch} onKeyPress={onKeyPress}
                        dictionaryOptions={dictionaryOptions}
                        onInputChange={onInputChange}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12} sm={1} align='right'>
                {/* <Button onClick={onGoBack} color="primary" variant="outlined" startIcon={<Icon>arrow_back</Icon>}>{t("Trở về")}</Button> */}
                {/* <Button onClick={onGoHome} variant="outlined" startIcon={<Icon>home</Icon>}>Trang chủ</Button> */}
            </Grid>
            <Grid container item xs={12} justify="flex-end" style={{ marginLeft: 40 }}>
                <Grid item xs={4}>
                    <Function history={history} />
                </Grid>
                <Grid item xs={8}>
                    <Paper style={{ margin: 10 }}>
                        <Grid container>
                            <Grid item xs={12} sm={2} style={{ marginTop: 20 }}>
                                <Button style={{ margin: 20 }} onClick={onSpeak} variant="outlined" color="primary"><Icon>volume_up</Icon></Button>
                                {getYoutubeId(wordItem.YoutubeLink) && <Button variant="outlined" title="Xem ví dụ trên Youtube" color="secondary" onClick={() => setOpen(true)} ><Icon>ondemand_video</Icon></Button>}
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <Grid contentEditable='false' dangerouslySetInnerHTML={{ __html: wordItem.Html }}></Grid>
                            </Grid>
                            <Grid item xs={12} sm={1}>
                                <IconButton onClick={onButtonAddWordLike} disabled={disableStar}>
                                    <StarTwoToneIcon style={{ color: color }} className={classes.iconStar}></StarTwoToneIcon>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Dialog maxWidth="sm" fullWidth onClose={() => setOpen(false)} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle style={{ backgroundColor: "#03A9F4" }}>
                        {t("Ví dụ trên Youtube")}
                    </DialogTitle>
                    <DialogContent>
                        <CardMedia
                            component="iframe"
                            height="300"
                            width="400"
                            image={"https://www.youtube.com/embed/" + getYoutubeId(wordItem.YoutubeLink)}
                        />
                    </DialogContent>
                </Dialog>
                {/* {getYoutubeId(wordItem.YoutubeLink) && <Grid item xs={12} sm={4}>
                    <CardMedia
                        component="iframe"
                        height="500"
                        image={"https://www.youtube.com/embed/" + getYoutubeId(wordItem.YoutubeLink)}
                    />
                </Grid>} */}
                {/* <Grid item xs={12} sm={4} style={{ marginLeft: 40 }}>
                    <Paper style={{ background: '#ccffee' }}>
                        <Typography style={{ fontSize: 30, align: 'center' }}>26 April 2020</Typography>
                        <Typography style={{ fontSize: 20, marginTop: 20 }}>
                            The grass are allways green on the other side of the fence
                        </Typography>
                        <IconButton align='left' onClick={onSpeak}>
                            <VolumeUpIcon>
                            </VolumeUpIcon>
                        </IconButton>
                        <Typography style={{ fontSize: 15, marginTop: 20, align: 'center' }}>(Đứng núi này trông núi nọ)</Typography>
                    </Paper>
                    <Paper style={{ marginTop: 20 }}>
                        <img style={{ height: 200, width: 400 }} src="http://localhost:5001/image/imgGrammar/Future-Continuous-tense-2.jpg" />
                    </Paper>
                </Grid> */}
            </Grid>
        </Grid >
    );
}
export default WordSearch;