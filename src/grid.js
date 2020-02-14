import React from 'react';
import moment from 'moment';

import {
  Grid,
  Row,
  RowPress,
  Cell,
  Details,
  Caption,
  Value,
  Image,
  IconView,
} from '../config/styles';

import Icon from './icon';
import Foto from '../assets/sem-imagem.jpg';

export default props => {
  const {
    data,
    cols,
    iconLeft,
    iconRight,
    showImage,
    color,
    colorCaption,
    colorValue,
    onPress,
    onPressCell,
    height,
    backgroundRow,
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

  const renderImage = props => {
    if (showImage) {
      return <Image source={Foto} resizeMode="contain" />;
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

  const renderRow = ({item, index}) => {
    if (onPressCell) {
      return (
        <RowPress
          onPress={() => onPressCell(item)}
          index={index}
          background={getColor(backgroundRow, item)}>
          {iconLeft ? renderIcon(iconLeft, item) : renderImage()}
          <Details>{renderCell(item, index)}</Details>
          {renderIcon(iconRight, item)}
        </RowPress>
      );
    } else {
      return (
        <Row index={index} background={getColor(backgroundRow, item)}>
          {iconLeft ? renderIcon(iconLeft, item) : renderImage()}
          <Details>{renderCell(item, index)}</Details>
          {renderIcon(iconRight, item)}
        </Row>
      );
    }
  };

  function getValue(field, type, item) {
    if (item[field]) {
      if (type === 'date') {
        return moment(new Date(item[field]))
          .utc(false)
          .format('DD/MM/YYYY');
      } else if (type === 'currency') {
        return (
          'R$ ' +
          item[field].toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        );
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
      } else {
        return;
      }
    }
  };
  //key={`${item[dataKey]}_${index}`}
  const renderCell = (item, index) => {
    if (item && cols) {
      return cols.map((col, i) => {
        return <Cell key={i}>{renderLine(col, item)}</Cell>;
      });
    }
  };

  function Extractor(item, index) {
    return index.toString();
  }

  if (data && data.length) {
    return (
      <Grid
        height={height}
        data={data}
        renderItem={renderRow}
        keyExtractor={(item, index) => Extractor(item, index)}
        contentContainerStyle={{paddingBottom: 10}}
      />
    );
  } else {
    return <></>;
  }
};

//keyExtractor={item => item.id}
