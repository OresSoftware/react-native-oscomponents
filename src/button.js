import React from 'react';

import {Button, ButtonLabel} from '../config/styles';

export default ({onPress, label, style}) => {
  return (
    <Button onPress={onPress} style={style}>
      <ButtonLabel>{label}</ButtonLabel>
    </Button>
  );
};
