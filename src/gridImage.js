import React, {useState} from 'react';

import { Image} from '../config/styles';
import SemImagem from '../assets/sem-imagem.jpg';


export default props => {
  const [img, setImg] = useState([{uri: `http://cloud.oressoftware.com:8081/estrelinhasnoceu/${props.image}`]);
  return <Image source={img} resizeMode="contain" onError={() => setImg(SemImagem)} />;
}