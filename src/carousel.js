import React, {useState, useRef} from 'react';
import Styled from 'styled-components';

import Carousel from 'react-native-snap-carousel';


import {windowHeight, windowWidth ,ratio} from '../config/styles';
import {formatCurrency} from '../commons/functions';
import Image from './image';


export default function OSCarousel({data, title}){
  const carousel = useRef();

  if(!data || !data.length){
    return <></>
  }

  const renderItem = ({item}) => {
    return (
      <ItemContainer>
        <ImageContainer>
        <Image source={item.imagem}/>
        </ImageContainer>
        
        <ItemDetail>
          <ItemDescription>{item.descricao}</ItemDescription>
          <ItemPrice>{formatCurrency(item.precovenda)}</ItemPrice>
        </ItemDetail>
      </ItemContainer>
    )
  }

  const renderTitle = () => {
    if(title){
      return (<Title>{title}</Title>);
    }
  }

  return (
    <Container >
      {renderTitle()}

      <Carousel  
        ref={carousel}
        data={data}
        renderItem={renderItem}
        sliderWidth={windowWidth * 0.9}
        sliderHeight={windowHeight}
        itemWidth={windowWidth * 0.45}
        layout='default'
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        activeSlideScale={1}
        loop={true}
      />

    </Container>
  )
}

const Container = Styled.View`
  align-items: center; 
`;

const Title = Styled.Text`
  font-size:15px;
`;

const ItemContainer = Styled.View`
  padding: 10px 10px;
  margin: 2px 5px;
`;

const ImageContainer = Styled.View`
  height: 80px;
  border-radius: 5px;
  margin: 5px 0;
`;

const ItemDetail = Styled.View`
  height: 50px;
`;

const ItemDescription = Styled.Text`
  max-height: 30px;
  font-size: 11px;
`;

const ItemPrice = Styled.Text`
  font-size: 18px;
  color: green;
  align-self: flex-end;
`;