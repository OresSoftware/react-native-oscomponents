import React, {useState, useRef} from 'react';
import Styled from 'styled-components';

import Carousel from 'react-native-snap-carousel';


import {windowHeight, windowWidth ,ratio} from '../config/styles';


export default function OSCarousel({data, title}){
  const carousel = useRef();

  if(!data || !data.length){
    return <></>
  }

  const renderItem = ({item}) => {
    return (
      <ItemContainer>
        <ItemImage source={{uri: 'http://cloud.oressoftware.com:8081/oressoftware/semfoto.bmp'}} resizeMode="contain"/>
        <ItemDetail>
          <ItemDescription>{item.descricao}</ItemDescription>
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
    <Container style={{width: 200, height: 200}}>
      {renderTitle()}

      <Carousel  
        ref={carousel}
        data={data}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        sliderHeight={windowHeight}
        itemWidth={windowWidth * 0.5}
        layout='default'
        inactiveSlideScale={0.7}
        inactiveSlideOpacity={0.8}
        activeSlideScale={1}
        loop={true}
      />

    </Container>
  )
}

const Container = Styled.View`
  align-items: center;
  height: 300;
  background: red;
`;

const Title = Styled.Text`
  font-size: 20px;
`;

const ItemContainer = Styled.View`
  border-radius: 5px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  elevation: 3;
  background: #FFF;
  padding: 0px 10px;
  margin: 20px;
`;

const ItemImage = Styled.Image`
  height: 150px;
  border-radius: 5px;
  margin: 5px 0;
`;

const ItemDetail = Styled.View`
  height: 50px;
`;

const ItemDescription = Styled.Text`
  font-size: 13px;
  padding: 3px;
`;