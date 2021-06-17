import {
  StyleSheet
}                from 'react-native';
import  THEME    from 'styles/theme';

const commonStyles = StyleSheet.create({
  shadow: {
    shadowColor: THEME.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 6,
  }


})

export default commonStyles;