import PropTypes            from 'prop-types';
import React                from 'react';
import {
  StyleSheet,
  TextInput
}                           from 'react-native';
import  THEME               from 'styles/theme';

const AppInput = (props) => {
  return (
    <TextInput
      {...props}
      style={styles.input}
    />
  );
};

AppInput.propTypes = {
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 0,
    backgroundColor: THEME.BACKGROUND_COLOR,
    borderRadius: 8,
    fontSize: 14,
    color: THEME.FONT_COLOR,
    fontFamily: 'Montserrat-Medium',
    paddingHorizontal: 15,
    flex: 1
  }
})

export default AppInput;
