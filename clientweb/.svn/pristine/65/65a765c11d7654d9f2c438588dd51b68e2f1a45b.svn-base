import React, { Suspense } from "react";

import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from "./store/redux";

import { I18nextProvider } from "react-i18next";
import i18n from "./app/utils/i18next";
import LinearProgress from "@material-ui/core/LinearProgress";
import { defaultRoutes } from "./routes";

import { Switch, Route, HashRouter } from "react-router-dom"; //BrowserRouter
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import defaultTheme from "./themes/default";
import { Provider } from "react-redux";
import { SnackbarProvider } from 'notistack';
import { Notifications } from 'react-push-notification';
require('dotenv').config()

const theme = createMuiTheme(defaultTheme);

const AppRoute = React.memo(() => {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <HashRouter>
                    <Suspense fallback={<LinearProgress />}>
                        <Switch>
                            {defaultRoutes.map((prop, key) => {
                                if (prop.default) return <Route component={prop.component} key={key} />;
                                return <Route exact path={prop.path} component={prop.component} key={key} />;
                            })}
                        </Switch>
                    </Suspense>
                </HashRouter>
            </SnackbarProvider>
        </ThemeProvider>
    );
});


function Default() {
    return (
        <Provider store={store}>
            <Notifications />

            <I18nextProvider i18n={i18n}>
                <AppRoute />
            </I18nextProvider>
        </Provider>
    )
}

ReactDOM.render(<Default />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
