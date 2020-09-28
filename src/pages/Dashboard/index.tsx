import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

import { Container, Button } from './styles';

const Dashboard: React.FC = () => {
  const { singOut } = useAuth();

  return (
    <Container>
      <Button title="Sair" onPress={singOut} />
    </Container>
  );
};

export default Dashboard;
