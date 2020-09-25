import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Keyboard,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import logoImage from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
} from './styles';

const Signin: React.FC = () => {
  const [keyboardOn, setKeyboardOn] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { navigate } = useNavigation();

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
              <Title>Faça seu login</Title>
            </View>

            <Form ref={formRef} onSubmit={handleClick}>
              <Input
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </Form>

            <Button onPress={() => formRef.current?.submitForm()}>
              Entrar
            </Button>

            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      {Platform.OS === 'android' && keyboardOn === false && (
        <CreateAccount onPress={() => navigate('Signup')}>
          <Icon name="log-in" size={20} color="#ff9000" />
          <CreateAccountText>Criar uma conta</CreateAccountText>
        </CreateAccount>
      )}
      {Platform.OS === 'ios' && (
        <CreateAccount onPress={() => navigate('Signup')}>
          <Icon name="log-in" size={20} color="#ff9000" />
          <CreateAccountText>Criar uma conta</CreateAccountText>
        </CreateAccount>
      )}
    </>
  );
};

export default Signin;
