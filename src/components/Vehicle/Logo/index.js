import PropTypes            from 'prop-types';
import React                from 'react';
import {
  View,
  Image,
  StyleSheet
}                           from 'react-native';
import * as R               from 'ramda';

const VehicleLogo = ({ data }) => {

  const getImageSource = () => {
    const path = R.pipe(
      R.path(['manufacturer', 'name']),
      R.defaultTo('https://zen.car/images/brands/nologo.svg'),
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
        style={styles.logo}
      />
    </View>
  )
};

VehicleLogo.propTypes = {
  data: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'center',
    minHeight: 56,
    minWidth: 56,
  }
})

export default VehicleLogo;