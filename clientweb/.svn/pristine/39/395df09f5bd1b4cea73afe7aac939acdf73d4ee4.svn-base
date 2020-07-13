import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer as reduxFormReducer } from "redux-form";
import authReducers from "./auth/authReducers";
import loadingReducers from "./loading/loadingReducers";

const rootReducer = combineReducers({
   form: reduxFormReducer,
   authService: authReducers,
   loadingService: loadingReducers,
});

//remove redux devtools on production
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares =
   process.env.NODE_ENV === "development"
      ? composeEnhancers(applyMiddleware(thunk))
      : applyMiddleware(thunk);
const store = createStore(rootReducer, middlewares);

export default store;
