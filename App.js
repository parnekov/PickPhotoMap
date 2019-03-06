import React, {Component} from 'react';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { reducer } from './src/reducer';
import MapV from './src/components/MapV';
import CameraV from './src/components/CameraV';

const store = createStore(reducer, applyMiddleware(ReduxThunk));
const navOptions = {title: 'PickMap App',}
const AppNavigator = createStackNavigator(
  {
    HomeScreen: {screen: CameraV, navigationOptions: navOptions},
    MapScreen: {screen: MapV, navigationOptions: navOptions}
  },
  {
    initialRouteName: "HomeScreen"
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (  
    <Provider store={store}>
      <AppContainer />
    </Provider>
    );
  }
}