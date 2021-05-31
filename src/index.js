import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConnectedApp from './components/App';
import {createStore} from "redux";
import reducer from './reducers';
import middleware from './middleware';
import {Provider} from "react-redux";

const store = createStore(reducer, middleware)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
  document.getElementById('root')
);
