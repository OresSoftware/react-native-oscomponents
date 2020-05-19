import React from 'react';
import Icon from './icon';

import Styled from 'styled-components';

export default OSHeader = props => {
  const {iconLeft, iconRight, image, title, subtitle, search, custom} = props;

  const renderIcon = iIcon => {
    if(iIcon){
      let iconPress = () => {};

      if (iIcon.onPress) {
        iconPress = iIcon.onPress;
      };
  
      if (iIcon.navigate) {
        iconPress = () => props.navigation.navigate(iIcon.navigate);
      }

      return <Icon {...iIcon} size={27} onPress={iconPress} color={custom.cores.font}/>
    }

    return <Icon/>
  }

  const renderImage = () => {
    if(image){
      return <Image source={{uri:image}} resizeMode="contain"/>
    }
  }

  const renderTitle = () => {
    if (title) {
      return <Title color={custom.cores.font}>{title}</Title>
    }
  }

  const renderSearch = () => {
    if (search) {
      return (
        <SearchContainer>        
          <EditContainer>
            <TextInput placeholder={search.placeholder}/>
            <Icon name="search" size={15} color={custom.cores.background} nopadding/>
          </EditContainer>
        </SearchContainer>
      )
    }
  }

  return (
    <Header background={custom.cores.background}>      
      <Header1>
        {renderIcon(iconLeft)}
        <TitleContainer>
        {renderImage()}
        {renderTitle()}
        </TitleContainer>
        {renderIcon(iconRight)}
      </Header1>
        {renderSearch()}
    </Header>
  );
}

const Header = Styled.View`
  padding-top: 25px;
  background: ${p => p.background || '#000'};
`;

const Header1 = Styled.View`
  height: 50px;
  flex-direction: row;
`;

const SearchContainer = Styled.View`
  height: 35px;
  flex-direction: row;
  padding: 0px 3px;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = Styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = Styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${p=>p.color};  
`;

const Image = Styled.Image`
  min-height: 45px;
  width: 100%;
  margin-bottom: 1px;
`;

const EditContainer = Styled.View`
  flex: 0.9;
  background: #FFF;
  border-radius: 15px;
  flex-direction: row;
  margin-bottom: 6px;
  align-items: center;
  height: 30px;
  padding: 0 10px;
`;

const TextInput = Styled.TextInput`
  flex: 1;
  padding: 2px 5px;
`;