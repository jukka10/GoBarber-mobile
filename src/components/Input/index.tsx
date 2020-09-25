import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps, TextInput as ReactNativeInput } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}
interface InputValueReference {
  value: string;
}
interface InputRef {
  focus(): void;
}
const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const { fieldName, registerField, error, defaultValue } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputRef = useRef<ReactNativeInput>(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
  }));

  return (
    <Container {...name}>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        ref={inputRef}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
