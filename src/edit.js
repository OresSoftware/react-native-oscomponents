import * as React from 'react';
import {TextInput} from 'react-native-paper';
import OSIcon from './icon';
import {Container, IconContainer, EditContainer} from '../config/styles';
import {TextInputMask } from 'react-native-masked-text';

export default ({
  label,
  value,
  onChangeText,
  placeholder,
  iconLeft,
  iconRight,
  autoFocus,
  password,
  textAlign,
  keyboard,
  onPress,
  error,
  returnKeyType,
  xref,
  disabled,
  mask,
  maskoptions,
}) => {
  const renderIcon = icon => {
    if (icon) {
      return (
        <IconContainer>
          <OSIcon
            name={icon.name || null}
            color={icon.color || null}
            size={icon.size || null}
            onPress={icon.onPress ? icon.onPress : null}
            className="edit"
          />
        </IconContainer>
      );
    }
  };
  return (
    <Container>
      <EditContainer>
        {renderIcon(iconLeft)}
        <TextInput
          ref={xref}
          style={{flex: 1}}
          error={error}
          color="#000"
          mode="outlined"
          label={label}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          onSubmitEditing={onPress}
          keyboardType={keyboard}
          textAlign={textAlign}
          secureTextEntry={password}
          returnKeyType={returnKeyType ? returnKeyType : 'send'}
          autoCapitalize="none"
          autoFocus={autoFocus}
          autoCorrect={false}
          keyboardAvoidingView={false}
          blurOnSubmit={false}
          disabled={disabled}
          theme={{
            colors: {
              primary: 'blue',
            },
          }}
          render={
            mask ? props => <TextInputMask {...props} type={mask} options={maskoptions}/> : undefined
          }
        />
        {renderIcon(iconRight)}
      </EditContainer>
    </Container>
  );
};
