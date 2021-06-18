import PropTypes        from 'prop-types';
import React            from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions
}                       from 'react-native';
import VehicleLogo      from 'components/Vehicle/Logo';
import CustomButton     from 'components/UI/CustomButton';
import THEME            from 'styles/theme';
import commonStyles     from 'styles/common';

const buttonWidth = (Dimensions.get('window').width - 12 * 4 - 8 * 3)/4

const VehicleCard = ({data}) => {
  const {modification, model, manufacturer} = data;

  const getTitle = () => {
    return `${manufacturer.name} ${model.name}`
  }

  const onPressButton = () => {
    console.log('press button')
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
      <View style={styles.buttons_row}>
        <CustomButton
          iconName='bug-outline'
          onPress={onPressButton}
          customStyles={styles.button_styles}
        />
        <CustomButton
          iconName='bug-outline'
          onPress={onPressButton}
          customStyles={styles.button_styles}
        />
        <CustomButton
          iconName='book-outline'
          onPress={onPressButton}
          customStyles={styles.button_styles}
        />
        <CustomButton
          iconName='bug-outline'
          onPress={onPressButton}
          customStyles={styles.button_styles}
        />
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
    alignItems: 'center',
    marginBottom: 12
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
  },
  buttons_row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button_styles: {
    width: buttonWidth,
    borderRadius: 8,
    paddingVertical: 14
  }
})

export default VehicleCard;
