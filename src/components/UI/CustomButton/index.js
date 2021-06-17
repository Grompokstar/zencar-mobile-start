import PropTypes    from 'prop-types';
import React        from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
}                   from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import  THEME       from 'styles/theme';
import commonStyles from 'styles/common';

const CustomButton = ({ label, iconName, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={[styles.root, commonStyles.shadow]}>
        <If condition={iconName}>
          <Ionicons name={iconName} size={24} color={THEME.GRAY} />
        </If>

        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16
  },
  text: {
    marginLeft: 15,
    color: THEME.GRAY,
    fontSize: 14,
    fontFamily: THEME.FONT_SEMI_BOLD
  }
})

export default CustomButton;
