import React, { useEffect, useState, Suspense } from "react";

import './App.css';
import AppBar from '../Modules/AppBar/components/AppBar'
import { appRoutes, defaultRoutes } from "../../routes";
import { Switch, Redirect, Route } from "react-router-dom"; //BrowserRouter
import { withSnackbar } from 'notistack';
import { useTranslation } from "react-i18next";
import NotificationOption from "@/components/Notification/RenderNotification";
import { webNotification } from "@/components/Notification/RenderNotification";
import * as api from "./services/AutoRemindAPI";
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux"
import { checkIsAuthenticated } from "@/store/redux/auth/authActions";
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { IpServer } from '@/app/utils/Port';

const drawerWidth = 200;
const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: 'white',
      // color: "white"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);


function App({ enqueueSnackbar, history, location }) {
  const classes = useStyles();
  const currentUser = useSelector((state) => state.authService.user)
  const isLoading = useSelector((state) => state.loadingService.isLoading)
  const { t } = useTranslation()
  const [remindData, setRemindData] = useState({ data: true })
  const [goNoti, setGoNoti] = useState(true)
  const dispatch = useDispatch();
  const handleChangeURL = (path) => {
    history.push(path)
  }
  const notification = (content, type) => {
    enqueueSnackbar(t(content), { variant: type, ...NotificationOption })
  }
  const reloadData = async () => {
    var currentTime = new Date()
    let startTime = new Date()
    let endTime = new Date()
    if (!remindData.data) {
      startTime.setHours(parseInt(remindData.TimeStartRemind.substring(0, 2)))
      startTime.setMinutes(parseInt(remindData.TimeStartRemind.substring(3, 5)))
      endTime.setHours(parseInt(remindData.TimeStopRemind.substring(0, 2)))
      endTime.setMinutes(parseInt(remindData.TimeStopRemind.substring(3, 5)))
    }

    if (currentUser.Id > 0 && currentTime.getTime() >= startTime.getTime() && currentTime.getTime() <= endTime.getTime()) {
      let word = {}
      const remindInfo = await api.getById(currentUser.Id)
      if (remindInfo.Id > 0) {
        if (remindInfo.CategoryReminder == 0) {
          word = await api.getHistory(currentUser.Id)
        }
        else if (remindInfo.CategoryReminder == 1) {
          word = await api.getFavorite(currentUser.Id)
        }
        else if (remindInfo.CategoryReminder == 2) {
          word = await api.getTopic(currentUser.Id, remindInfo.IdTopic)

        }
        if (word.Id > 0) {
          webNotification(word.Word, word.Description, (event) => {
            event.preventDefault(); // prevent the browser from focusing the Notification's tab
            window.open(`http:${IpServer}:3000/#/timkiem?LanguageTranslate=English&Word=${word.Word}`, '_blank');
          })
        }
      }
    }
  }
  useEffect(() => {
    dispatch(checkIsAuthenticated())
  }, [location.pathname, currentUser])


  useEffect(() => {
    reloadData()
  }, [goNoti]);

  useEffect(() => {
    getInfo()
  }, [currentUser.Id]);

  const getInfo = async () => {
    const remindInfo = await api.getById(currentUser.Id)
    setRemindData(remindInfo || {})
  }

  useEffect(() => {
    if (remindData.Id > 0) {
      let startTime = new Date()
      let endTime = new Date()
      startTime.setHours(parseInt(remindData.TimeStartRemind.substring(0, 2)))
      startTime.setMinutes(parseInt(remindData.TimeStartRemind.substring(3, 5)))
      endTime.setHours(parseInt(remindData.TimeStopRemind.substring(0, 2)))
      endTime.setMinutes(parseInt(remindData.TimeStopRemind.substring(3, 5)))

      if (startTime.getTime() > endTime.getTime()) {
        endTime.setDate(endTime + 1)
      }

      var currentTime = new Date()
      if (currentTime.getTime() >= startTime.getTime() && currentTime.getTime() <= endTime.getTime()) {
        const minutes = Math.round(((endTime.getTime() - startTime.getTime()) / 60000))
        const seconds = minutes / parseInt(remindData.NumberWordOnDay) * 60
        window.setInterval(function () {
          setGoNoti(x => !x)
        }, seconds * 1000);
      }
    }
  }, [remindData])

  return (
    <div className="App">
      <Backdrop open={Boolean(isLoading)} className={classes.backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <AppBar history={history} />
      {/* <nav className={classes.drawer}>
        <Hidden xsDown implementation="css">
          {location.pathname != "/home" && location.pathname != "/dangnhap" && location.pathname != "/timkiem" &&
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open={false}
            >
              {drawer}
            </Drawer>}
        </Hidden>
      </nav> */}
      {/* <Toolbar /> */}
      {/* <main className={classes.content}> */}

      <Container maxWidth="xl" style={{ paddingTop: 80 }}>
        <Suspense fallback={null}>
          <Switch>
            {appRoutes.map((prop, key) => {
              if (prop.redirect) return <Redirect from={prop.path} to={prop.to} key={key} />;
              return <PrivateRoute exact path={prop.path} component={prop.component} key={key} notification={notification} />;
            })}
          </Switch>
        </Suspense>
      </Container>
      {/* </main> */}
    </div >
  );
}

const PrivateRoute = ({ component: Component, notification, ...rest }) => {
  // const user = useSelector((state) => state.authService.user)

  // console.log(user)

  return <Route
    {...rest}
    render={props => {
      return <Component {...props} notification={notification} />
      // <Redirect
      //   notification={notification}
      //   to={{
      //     pathname: "/dangnhap",
      //     state: { from: props.location }
      //   }}
      // />
    }
    }
  />
}





export default withSnackbar(App);
