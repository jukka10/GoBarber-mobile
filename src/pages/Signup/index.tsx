import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImage from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, BackToSignin, BackToSigninText } from './styles';

const Signin: React.FC = () => {
  const [keyboardOn, setKeyboardOn] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const { goBack } = useNavigation();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOn(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOn(false);
    });
  }, [Keyboard]);

  const handleClick = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImage} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={formRef} onSubmit={handleClick}>
              <Input name="name" icon="user" placeholder="Nome" />
              <Input name="email" icon="mail" placeholder="E-mail" />
              <Input name="password" icon="lock" placeholder="Senha" />
            </Form>

            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      {Platform.OS === 'android' && keyboardOn === false && (
        <BackToSignin onPress={() => goBack()}>
          <Icon name="arrow-left" size={20} color="#f4ede8" />
          <BackToSigninText>Voltar para login</BackToSigninText>
        </BackToSignin>
      )}
      {Platform.OS === 'ios' && (
        <BackToSignin onPress={() => goBack()}>
          <Icon name="arrow-left" size={20} color="#f4ede8" />
          <BackToSigninText>Voltar para login</BackToSigninText>
        </BackToSignin>
      )}
    </>
  );
};

export default Signin;
