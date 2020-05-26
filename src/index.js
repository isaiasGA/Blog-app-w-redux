import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
//applyMiddleware is used for setting up redux-thunk
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import App from "./components/App.js";
import reducers from "./reducers";

//setting up redux-thunk
//Each time we dispatch an action, this ACTION will be sent to  redux-thunk first as the 'middleware'
//After 'redux-thunk', then the ACTION will then be sent to all of the differnt reducers
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
