import React, { useState } from 'react';
import Styled from 'styled-components';
import SemImagem from '../assets/sem-imagem.jpg';

export default function OSImage(props){
  
  const {source} = props;
  const [loaded, setLoaded] = useState(false);

  const defaultSource = !source ? SemImagem : null;

  let img = '';
  if(source){
    img = (source instanceof Object) ? source : {uri: source};
  }
  
  return (
    <Container {...props} background={loaded ? '#FFF' : '#DDD'}>
        <Image {...props}           
          source={source ? img : null}
          defaultSource={defaultSource} 
          resizeMode={'contain'} 
          blurRadius={0}
          onLoad={() => setLoaded(true)}
          />
    </Container>
    )
}

const Container = Styled.View`
  background: ${p => p.background};
  border-radius: 1px;
`;

const Image = Styled.Image` 
  width: 100%;
  height: 100%;
`;