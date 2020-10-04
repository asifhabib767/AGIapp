/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import React from 'react';

// AppRegistry.registerComponent(appName, () => App);

const store = configureStore();
const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => RNRedux);
