/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/store';  
import ToastHandler from './src/component/ToastHandler';

const ReduxApp = () => (
  <Provider store={store}>
    <App />
    <ToastHandler />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);

