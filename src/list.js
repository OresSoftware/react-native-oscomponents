import * as React from 'react';
import {List} from 'react-native-paper';

export default ({title, description, icon}) => {
  return (
    <List.Item
      title={title}
      titleNumberOfLines={2}
      description={description}
      descriptionNumberOfLines={3}
      left={props => <List.Icon {...props} icon={icon} />}
    />
  );
};
