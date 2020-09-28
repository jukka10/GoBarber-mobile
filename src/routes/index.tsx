import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import Auth from './auth.routes';
import App from './app.routes';

import { useAuth } from '../contexts/AuthContext';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  return user ? <App /> : <Auth />;
};

export default Routes;
