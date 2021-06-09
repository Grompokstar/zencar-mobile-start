import PropTypes            from 'prop-types';
import React                from 'react';
import {
  View,
  StyleSheet,
  TextInput
}                           from 'react-native';
import { THEME }            from 'styles/theme';
import { Ionicons }         from '@expo/vector-icons';
import AppInput             from 'components/UI/Forms/Input';

const AppSearchInput = (props) => {
  return (
    <View style={styles.search_container}>
      <Ionicons
        style={{paddingLeft: 15}}
        name="search"
        size={22}
        color={THEME.GRAY}
      />
      <AppInput
        {...props}
      />
    </View>

  );
};

AppSearchInput.propTypes = {
};

const styles = StyleSheet.create({
  search_container: {
    flexDirection: 'row',
    backgroundColor: THEME.BACKGROUND_COLOR,
    borderRadius: 8,
    alignItems: 'center'
  },
  input: {
    height: 48,
    borderWidth: 0,
    backgroundColor: THEME.BACKGROUND_COLOR,
    borderRadius: 8,
    fontSize: 14,
    color: THEME.FONT_COLOR,
    fontFamily: 'Montserrat-Medium',
    paddingHorizontal: 15
  }
})

export default AppSearchInput;
