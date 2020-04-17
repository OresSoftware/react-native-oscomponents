import React from 'react';
import {Appbar} from 'react-native-paper';

import Icon from './icon';
import { Image } from 'react-native';

import Styled from 'styled-components';

export default props => {
  const {image, title, subTitle, iconLeft, iconRight, navigation, search} = props;

  function renderIcon(iIcon) {
    if (iIcon) {
      let onPress = () => {};

      if(iIcon.navigate) {
        onPress = () => navigation.navigate(iIcon.navigate);
      }

      if(iIcon.onPress) {
        onPress = iIcon.onPress;
      }

      return <Appbar.Action icon={iIcon.name} onPress={onPress} color={'#FFF'} size={27} />;
    }
    
    return <Appbar.Action/>
  }

  function renderImage() {
    if(image) {
      return (
        <ImageContainer>
          <Image source={{uri:image}} resizeMode="contain" style={{flex: 1}}/>
        </ImageContainer>
      )      
    }    
  }

  function renderSearch() {
    if(search){
      return (
        <SearchContainer>
          <SearchTextInput placeholder={search.placeholder}/>
          <Icon name={'search'} size={17}/>
        </SearchContainer>
      )
    }    
  }

  function renderTitle() {
    if(title){
      return (
        <TitleContainer>
          <TitleTit>{title}</TitleTit>
          { subTitle ? <TitleSub>{subTitle}</TitleSub> : null}
        </TitleContainer>
      )
    }
  }

  return ( 
    <HeaderContainer height={search ? 120 : 80}>        
      <HeaderPrincipal>
        {renderIcon(iconLeft)}
        {renderImage()}
        {renderTitle()}
        {renderIcon(iconRight)}
      </HeaderPrincipal>  
      <HeaderPesquisa>
        {renderSearch()}
      </HeaderPesquisa>
    </HeaderContainer>
  )
}

const HeaderContainer = Styled.View`
  padding-top: 25px;
  height: ${p => p.height}px;
  background: #11548F;
  box-shadow: 0 5px 3px rgba(0, 0, 0, 0.15);  
  elevation: 3;
  margin-bottom: 3px;
`;

const HeaderPrincipal = Styled.View`
  flex: 1;
  flex-direction: row;
`;

const HeaderPesquisa = Styled.View`
  height: 50;
`;

const ImageContainer = Styled.View`
  flex: 1; 
  height: 50px;
  padding: 11px 22px;
`;

const SearchContainer = Styled.View`
  height: 50px;
  flex: 1px;
  background: #FFF;
  border-radius: 3px;
  flex-direction: row;
  margin: 6px 10px;
  justify-content: center;
  align-items: center;
`;

const SearchTextInput = Styled.TextInput`
  flex: 1;
  height: 35px;
  padding-left: 10px;
  font-size: 18px;
`;

const TitleContainer = Styled.View`
  flex: 1;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const TitleTit = Styled.Text`
  font-size: 19;
  color: #FFF;
  font-weight: bold;
`;

const TitleSub = Styled.Text`
  font-size: 14;
  color: #FFF;
`;