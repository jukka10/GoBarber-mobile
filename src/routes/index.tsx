import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Signin from '../pages/Signin/index';
import Signup from '../pages/Signup/index';

const { Navigator, Screen } = createStackNavigator();

const Auth: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Screen name="Signin" component={Signin} />
      <Screen name="Signup" component={Signup} />
    </Navigator>
  );
};

export default Auth;
