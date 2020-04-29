import React from 'react';

import {Button, ButtonLabel} from '../config/styles';

export default ({onPress, label, style, backgroundColor}) => {
  return (
    <Button 
      onPress={onPress} 
      style={style} 
      backgroundColor={backgroundColor}>
      <ButtonLabel>{label}</ButtonLabel>
    </Button>
  );
};
