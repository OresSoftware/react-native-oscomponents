import React, {Component} from 'react';
import {Checkbox} from 'react-native-paper';

import {Label, ContainerFlexRow} from '../config/styles';

export default class OSCheckbox extends Component {
  state = {
    label: '',
    color: 'tomato',
  };

  render() {
    const {checked} = this.props;
    return (
      <ContainerFlexRow>
        <Checkbox
          status={this.props.checked ? 'checked' : 'unchecked'}
          onPress={() => this.props.onPress(!checked)}
          color={this.props.color ? this.props.color : 'tomato'}
        />
        <Label onPress={() => this.props.onPress(!checked)}>
          {this.props.label}
        </Label>
      </ContainerFlexRow>
    );
  }
}
