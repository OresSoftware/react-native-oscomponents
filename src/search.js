import React, {useState} from 'react';
import {Alert, View} from 'react-native';

import OSEdit from './edit';

import OSLoader from './loader';

export default ({
  apiUrl,
  setResult,
  onPress,
  placeholder,
  eNum,
  Min,
  ParamsGetFixo,
  api,
  source
}) => {
  const [tipo, setTipo] = useState(eNum[0]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  function nextBusca() {
    setTipo(eNum[tipo.index === eNum.length - 1 ? 0 : tipo.index + 1]);
    setValue('');
  }

  async function Pesquisa() {
    if (value.length >= Min) {
      return;
    }
    await setLoading(true);
    let parametro;
    let response = {};
    try {
      if (value) {
        if (ParamsGetFixo) {
          parametro = JSON.parse(
            `{"params": {"${tipo.id}": "${value}","${ParamsGetFixo.name}":"${
              ParamsGetFixo.value
            }"}}`,
          );
        } else {
          parametro = JSON.parse(`{"params": {"${tipo.id}": "${value}"}}`);
        }
      } else if (ParamsGetFixo) {
        parametro = JSON.parse(
          `{"params": {"${ParamsGetFixo.name}":"${ParamsGetFixo.value}"}}`,
        );
      }
      response = await api.get(apiUrl, parametro);

      await setResult(response.data ? response.data.items : []);
    } catch (err) {
      Alert.alert(err.message);
    }

    await setLoading(false);

    if (onPress) {
      onPress();
    }
  }

  return (
    <View>
      <OSEdit
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        label={tipo.title}
        iconLeft={
          eNum.length > 1
            ? {name: 'exchange-alt', onPress: nextBusca}
            : undefined
        }
        iconRight={{name: 'search', onPress: Pesquisa}}
        onPress={Pesquisa}
        autoFocus={true}
        keyboard={tipo.keyboard ? tipo.keyboard : 'default'}
      />
      <OSLoader visible={loading} source={source} />
    </View>
  );
};
