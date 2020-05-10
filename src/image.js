import React, { useState } from 'react';
import {Animated} from 'react-native';
import Styled, {css} from 'styled-components';
import SemImagem from '../assets/sem-imagem.jpg';

import {windowWidth, ratio} from '../config/styles';

export default function OSImage(props){
  
  const {source} = props;
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const defaultSource = !source ? SemImagem : null;
  const img = (source instanceof Object) ? source : {uri: source};

  const onLoad = (e) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
    }).start();
  }


  return (
    <Container {...props}>
        <Image {...props} 
          source={img}
          defaultSource={defaultSource} 
          resizeMode={'contain'} 
          blurRadius={0}/>
    </Container>
    )
}

const getWidth = props => {
  return props.imageCover ? windowWidth : windowWidth * 0.25;
}

const getHeight = props => {
  return props.flexRows ? (ratio / props.flexRows) : (ratio / 2)
}

const Container = Styled.View`
  background: #F2F2F2;
  border-radius: 5px;
`;

const ImageAnimated = Styled(Animated.Image)`
  position: absolute;
  width: ${p => getWidth(p)};
  height: ${p => getHeight(p)};
`;

const Image = Styled.Image` 
  width: ${p => getWidth(p)};
  height: ${p => getHeight(p)};
`;