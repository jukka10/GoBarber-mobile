import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Keyboard,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import getValidationError from '../../utils/getValidationErrors';

import logoImage from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, BackToSignin, BackToSigninText } from './styles';

interface SignUpProp {
  name: string;
  email: string;
  password: string;
}

const Signin: React.FC = () => {
  const [keyboardOn, setKeyboardOn] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const { goBack } = useNavigation();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOn(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOn(false);
    });
  }, [Keyboard]);

  const handleClick = useCallback(async (data: SignUpProp) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().min(6, 'No mínimo 6 digitos').required(),
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Digite um email válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data.password);

      // await api.post('/users', data);

      Alert.alert(
        'Cadastro Realizado',
        'Você já pode fazer seu login no GoBarber',
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);
        console.log(errors);

        formRef.current?.setErrors(errors);

        return;
      } else {
        Alert.alert(
          'Erro ao cadastrar',
          'Ocorreu um erro ao fazer cadastro, tente novamente',
        );
      }
    }
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
              <Input
                returnKeyType="next"
                name="name"
                icon="user"
                placeholder="Nome"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
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
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
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
