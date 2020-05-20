import React, {useState, useRef} from 'react';
import Styled from 'styled-components';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import {windowHeight, windowWidth ,ratio} from '../config/styles';
import {formatCurrency} from '../commons/functions';
import Image from './image';


export default function OSCarousel(props){
  const carousel = useRef();
  const {data, title, onPress} = props;
  const [active, setActive] = useState(0);

  if(!data || !data.length){
    return <></>
  }

  const renderPagination = () => {
    return (
        <Pagination
          dotsLength={data.length}
          activeDotIndex={active}
          dotStyle={{
              width: 5,
              height: 5,
              borderRadius: 5,
              backgroundColor: 'rgba(0, 0, 0, 0.52)'
          }}
          containerStyle={{height: 50, paddingTop: 15 }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
  }
  const renderItem = ({item}) => {
    return (
      <ItemContainer onPress={() =>onPress(item)}>
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
        activeSlideAlignment={'start'}        
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        activeSlideScale={1}
        loop={true}
        onSnapToItem={(index) => setActive(index)}
      />
      {renderPagination()}
    </Container>
  )
}

const Container = Styled.View`
  align-items: center; 
  margin-top: 20px;
`;

const Title = Styled.Text`
  font-size:14px;
  background : #FA5858;
  position: absolute;
  top: -30;
  left: -5;
  padding: 5px 15px;
  color: #FFF;
`;

const ItemContainer = Styled.TouchableOpacity`
  padding: 10px 10px;
  margin: 10px 5px;
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
  max-height: 25px;
  font-size: 11px;
`;

const ItemPrice = Styled.Text`
  font-size: 20px;
  color: green;
  align-self: center;
`;
