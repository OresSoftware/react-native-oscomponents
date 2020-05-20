import React from 'react';
import Styled from 'styled-components';

import {
  Grid,
  Cell,
  Details,
  Caption,
  Value,
  IconView,
} from '../config/styles';

import Icon from './icon';
import Image from './image';

import {windowWidth ,ratio} from '../config/styles';

import {formatCurrency, formatDate} from '../commons/functions';

export default props => {
  const {
    data,
    cols,
    iconLeft,
    iconRight,
    image,
    color,
    colorCaption,
    colorValue,
    onPress,
    height,
    backgroundRow,

    description,
    price,
    quantity,
    headerComponent
  } = props;

  const getColor = (cor, obj) => {
    if (!cor || !obj) {
      return;
    }

    if (typeof cor === 'function') {
      return cor(obj);
    } else {
      return cor;
    }
  };

  const getIconName = (icon, obj) => {
    if (!icon) {
      return;
    }

    if (typeof icon.name === 'function') {
      return icon.name(obj);
    } else {
      return icon.name;
    }
  };

  function getValue(field, type, item) {
    if (item[field]) {
      if (type === 'date') {
        return formatDate(new Date(item[field]))      
      } else if (type === 'currency') {
        return formatCurrency(item[field])
      } else if (typeof type === 'function') {
        return type(item);
      } else {
        return item[field];
      }
    }
  }

  function getLine(col, item) {
    let value =
      typeof col.value === 'string'
        ? getValue(col.value, col.type, item)
        : col.value.map((field, i) => {
            return (
              // se nao for undefined o item entao
              item[field]
                ? // devolve valor se for o primeiro
                  i === 0
                  ? getValue(field, col.type, item)
                  : ' / ' + getValue(field, col.type, item)
                : ''
            );
          });
    if (value) {
      return {title: col.title, value: value};
    } else {
      return {title: '', value: ''};
    }
  }  



  const renderImage = item => {
    if (image && image.field) {
      const img = item[image.field] !== '' ? item[image.field]: '';

      return (
        <ImageContainer {...props}>
          <Image {...props} source={img}/>
        </ImageContainer>
      );
    }
  };

  const renderIcon = (icon, item) => {
    const iconName = getIconName(icon, item);

    if (iconName) {
      return (
        <IconView>
          <Icon
            name={iconName}
            size={icon.size || 22}
            color={getColor(color, item)}
            onPress={onPress ? () => onPress(item) : undefined}
          />
        </IconView>
      );
    }
  };

  const renderDescription = (item)  => {
    if (description) {
      return (
        <DescriptionContainer>
          <DescriptionText>{item[description.field]}</DescriptionText>
        </DescriptionContainer>
      );
    }
  }

  const renderQuantity = (item) => {
    if(quantity){
      return (
        <QuantityContainer>
          <Icon name={item.quantidade == 1 ? 'trash-alt' : 'minus'} size={15} onPress={quantity.actionRem ? () => quantity.actionRem(item) : null}/>
          <QuantityText>{item[quantity.field]}</QuantityText>
          <Icon name={'plus'} size={15} onPress={quantity.actionAdd ? () => quantity.actionAdd(item) : null}/>
        </QuantityContainer>
      )
    }
  }
  
  const renderPrice = (item) => {
    if (price) {
      return (
        <PriceContainer>
           <PriceText>{formatCurrency(item[price.field])}</PriceText>
        </PriceContainer>
      ) 
    }
  }  
  
  const renderRow = ({item, index}) => {  
    if (image && image.cover) {
      return (
        <Row
          {...props}
          index={index}          
          onPress={onPress ? () => onPress(item) : null}
          background={getColor(backgroundRow, item)}>
          {renderQuantity(item)}
          {renderPrice(item)}
          {renderImage(item)}
        </Row>
      )
    }

    return (        
      <Row 
        {...props}
        index={index}
        onPress={onPress ? () => onPress(item) : null}
        background={getColor(backgroundRow, item)}>

        {iconLeft ? renderIcon(iconLeft, item) : renderImage(item)}

        <Details>
          {renderCells(item, index)}
          {renderDescription(item)}
          <Line>
          {renderQuantity(item)}
          {renderPrice(item)}
          </Line>
        </Details>
       
        {renderIcon(iconRight, item)}
      </Row>
    );
  };


  const renderLine = (col, item) => {
    if (col.value) {
      let line = getLine(col, item);
      if (line.value) {
        return (
          <>
            <Caption
              color={getColor(colorCaption, item)}
              bold={col.boldCaption}
              fontsize={col.fontsize ? col.fontsize : undefined}>
              {line.title ? ' ' + line.title + ': ' : ''}
            </Caption>
            <Value
              ellipsizeMode="tail"
              numberOfLines={col.lines || 1}
              color={getColor(colorValue, item)}
              bold={col.boldValue}
              fontsize={col.fontsize ? col.fontsize : undefined}>
              {line.value}
            </Value>
          </>
        );
      }
    }
  };
  
  const renderCells = (item, index) => {
    if (item && cols) {
      return cols.map((col, i) => {
        return <Cell key={i}>{renderLine(col, item)}</Cell>;
      });
    }
  };

  const renderHeader = () => {
    if (headerComponent) {
      return (
        <ContainerHeader>
        {headerComponent()}
        </ContainerHeader>
      )
    }

    return <></>
  }

  function Extractor(item, index) {
    return index.toString();
  }

  if (data && data.length>0) {
    return (
      <ContainerBody>
      <Grid
        height={height}
        data={data}
        renderItem={renderRow}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item, index) => Extractor(item, index)}
      />
      </ContainerBody>
    );
  } else {
    return <></>;
  }
};

const getMarginH = p => (p.margins && p.margins.h ? p.margins.h : 10);
const getMarginV = p => (p.margins && p.margins.v ? p.margins.v : 10);
const getHeight = p => p.flexRows ? (ratio / p.flexRows) : (ratio / 5);
const getWidth = p => {
  let width = p.image && p.image.cover ? windowWidth : windowWidth * 0.30;
  width = width - getMarginH(p)*2;

  return width;
}

const ContainerHeader = Styled.View`
  padding-top: 10px;
  flex-grow: 1;
`;
const ContainerBody = Styled.View`
  flex-grow: 1;
`;

const Row = Styled.TouchableOpacity`
  background: #FFF;
  flex-direction: row; 
  box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.1);  
  elevation: 1;
  border-radius: 0px; 
  overflow: hidden;

  width: ${p => getWidth({...p, image: {cover: true}})};
  height: ${p => getHeight(p)}; 
  margin-top: ${p => getMarginV(p)};
  margin-left: ${p =>getMarginH(p)};
`;

const Line = Styled.View`
  flex-direction: row;
`;

const ImageContainer = Styled.View`
  width:  ${p => getWidth(p)};
  height: ${p => getHeight(p)};
  padding: ${p => p.image && p.image.cover ? 0 : '5px 5px 8px 5px'};
`;

const PriceContainer = Styled.View`
  padding-horizontal: 5px;
  flex: 1;
  flex-direction: row-reverse;
`;

const PriceText = Styled.Text`
  font-size: 22px;
  color: green;
  align-self: flex-end;
`;

const DescriptionContainer = Styled.View`
  flex: 1;
  overflow: hidden;
`;

const DescriptionText = Styled.Text`
  font-size: 13px;
`;

const QuantityContainer = Styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  background: red;
`;

const QuantityText = Styled.Text`
  width: 40px;
  align-items: center;
  text-align: center;
  justify-content: center;
`;