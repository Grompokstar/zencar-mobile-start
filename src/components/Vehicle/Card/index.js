import PropTypes        from 'prop-types';
import React            from 'react';
import {
  View,
  Text,
  StyleSheet
}                       from 'react-native';
import VehicleLogo      from 'components/Vehicle/Logo';
import  THEME           from 'styles/theme';
import commonStyles     from 'styles/common';

const VehicleCard = ({data}) => {
  const {modification, model, manufacturer} = data;

  const getTitle = () => {
    return `${manufacturer.name} ${model.name}`
  }

  return (
    <View style={[styles.root, commonStyles.shadow]}>
      <View style={styles.header}>
        <View style={styles.logo_container}>
          <VehicleLogo data={data}/>
        </View>

        <View style={styles.title_container}>
          <Text style={styles.title}>{getTitle()}</Text>
          <Text style={styles.plate}>госномер не указан</Text>
        </View>


      </View>
    </View>
  );
};

VehicleCard.propTypes = {
  data: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    padding: 12
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  logo_container: {
    marginRight: 20
  },
  title_container: {

  },
  title: {
    textTransform: 'uppercase',
    fontSize: 16,
    fontFamily: THEME.FONT_SEMI_BOLD,
    color: THEME.FONT_COLOR,
    letterSpacing: 0.15,
    marginBottom: 4
  },
  plate: {
    fontFamily: THEME.FONT_SEMI_BOLD,
    color: THEME.GRAY_70,
    fontSize: 14,
    letterSpacing: 0.1
  }
})

export default VehicleCard;
