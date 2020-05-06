import Styled, {css} from 'styled-components';
import {RFValue} from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';


import FAIcon from 'react-native-vector-icons/FontAwesome5';
/** Ver icones
 * @see https://fontawesome.com/icons?from=io
 */

export const windowHeight   = Dimensions.get('window').height;
export const windowWidth    = Dimensions.get('window').width;
export const ratio          = windowWidth * 1.68;

export const Container = Styled.View`
  flex-direction: column;
  margin: 3px;
`;

export const ContainerFlexRow = Styled.View`
  display: flex;
  flex-direction: row;
  margin: 3px;
  align-items: center;
  justify-content: flex-start;
`;

export const Button = Styled.TouchableOpacity`
  border-radius: 3px;
  height: 45px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  background: ${p => (p.backgroundColor ? p.backgroundColor : 'tomato')};   
`;

export const ButtonLabel = Styled.Text`  
  color: ${p => (p.color ? p.color : '#FFF')};     
  font-size: ${p => (p.fontsize ? RFValue(p.fontsize) : RFValue(18))};  
`;

export const Label = Styled.Text`  
  color: ${p => (p.color ? p.color : '#444')};   
  font-size: ${p => (p.fontsize ? RFValue(p.fontsize) : RFValue(18))};  
`;

export const IconEdit = css`
  width: 40px;
  ${Container}
`;

export const IconGrid = css`
  width: 40px;
  height: 40px;
  ${Container};
`;

export const Icon = Styled(FAIcon)`
  color: ${p => p.color};
  padding: ${p => p.nopadding ? 0 : ' 12px 8px' };
`;

export const IconLabel = Styled.Text`
  font-size: ${p => (p.fontsize ? RFValue(p.fontsize) : RFValue(13))};  
  color: ${p => p.color};
`;

export const IconButton = Styled.TouchableOpacity`
  ${p => (p.className === 'grid' ? IconGrid : '')};
  ${p => (p.className === 'edit' ? IconEdit : '')};
  background: ${p => (p.backgroundColor ? p.backgroundColor : 'transparent')};
  align-items: center;
  justify-content: center;
`;

export const EditContainer = Styled.KeyboardAvoidingView`
  height: 62px;  
  flex-direction: row;
  border-radius: 1px;
  margin: 0px 0;
  align-items: center;
`;

export const IconContainer = Styled.View`
  flex-direction: column;
  margin: 0px 2px -6px 2px;
  border-color: gray;
  border-radius: 4px;
  border-width: 1px;
  height: 57px;
  justify-content: center;
`;

export const Grid = Styled.FlatList`
  height: ${p => (p.height ? p.height : '90%')};
`;

export const Cell = Styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Details = Styled.View`
  padding: 5px; 
  flex: 1; 
`;

export const Caption = Styled.Text`
  color: ${p => (p.color ? p.color : '#AAA')};
  font-size: ${p => (p.fontsize ? RFValue(p.fontsize) : RFValue(15))};    
  margin-right: 5px;
  font-weight: ${p => (p.bold ? 'bold' : 'normal')}; 
`;

export const Value = Styled.Text`
  color: ${p => (p.color ? p.color : '#666')};
  font-size: ${p => (p.fontsize ? RFValue(p.fontsize) : RFValue(15))};    
  flex: 1;
  font-weight: ${p => (p.bold ? 'bold' : 'normal')}; 
`;

export const IconView = Styled.View`
  justify-content: center;
`;
