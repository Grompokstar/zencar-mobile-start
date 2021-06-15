import PropTypes            from 'prop-types';
import React                from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
}                           from 'react-native';
import * as R               from 'ramda';
import { Ionicons }         from '@expo/vector-icons';
import { THEME }            from 'styles/theme';

const VehicleLogo = ({ data }) => {
  /*const getMarkName = () => {
    return data.model.name;
  };

  const getImageFileName = () => {
    const name = getMarkName().toLowerCase();

    return name.replace(/ /g, '-');
  };

  const onImageError = () => {
    image.current.src = '/images/brands/nologo.svg';
  };*/

  console.log(data)

  const getImageSource = () => {
    const path = R.pipe(
      R.path(['manufacturer', 'name']),
      R.defaultTo(''),
      R.toLower,
      R.split(' '),
      R.join('-'),
    )(data)

    return {
      uri: 'https://zen.car/images/brands/' + path + '.png'
    }
  }

  return (
    <View>
      <Image
        source={getImageSource()}
        style={{
          resizeMode: 'center',
          minHeight: 56,
          minWidth: 56,
        }}
      />
    </View>
  )
};

VehicleLogo.propTypes = {
  data: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['large', 'medium', 'small', 'tiny'])
}

export default VehicleLogo;