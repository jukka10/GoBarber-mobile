import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import ContextProvider from './contexts';

import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" translucent />
    <ContextProvider>
      <Routes />
    </ContextProvider>
  </NavigationContainer>
);

export default App;
