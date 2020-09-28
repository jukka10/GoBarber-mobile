import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Dashboard from '../pages/Dashboard/index';

const { Navigator, Screen } = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Screen name="Dashboard" component={Dashboard} />
    </Navigator>
  );
};

export default AppRoutes;
