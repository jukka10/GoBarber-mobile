import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  margin: 64px 0 24px;
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
`;

export const BackToSignin = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;

  padding: 16px 0 ${16 + getBottomSpace()}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const BackToSigninText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #f4ede8;
  margin-left: 16px;
`;
