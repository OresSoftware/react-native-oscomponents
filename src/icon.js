import React from 'react';

import {IconButton, IconLabel, Icon} from '../config/styles';

const OSIcon = ({
  name,
  size,
  color,
  label,
  onPress,
  className,
  backgroundColor,
}) => {
  if (!name) {
    return;
  }

  const renderText = () =>
    label ? <IconLabel color={color}>{label}</IconLabel> : null;

  if (onPress) {
    return (
      <IconButton
        onPress={e => onPress(e)}
        className={className}
        backgroundColor={backgroundColor}>
        <Icon name={name} size={size || 22} color={color || '#333'} />
        {renderText()}
      </IconButton>
    );
  } else {
    return (
      <>
        <Icon name={name} size={size || 22} color={color || '#333'} />
        {renderText()}
      </>
    );
  }
};

export default OSIcon;
