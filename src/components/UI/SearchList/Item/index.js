import PropTypes            from 'prop-types';
import React                from 'react';
import {
  View,
  Text,
  StyleSheet
}                           from 'react-native';
import { Ionicons }         from '@expo/vector-icons';
import  THEME               from 'styles/theme';

const SearchListItem = ({ text }) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{text}</Text>
      <Ionicons name="chevron-forward" size={18} color={THEME.GRAY_30} />
    </View>

  );
};

SearchListItem.propTypes = {
  text: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.GRAY_10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 14,
    color: THEME.FONT_COLOR,
    fontFamily: 'Montserrat-SemiBold'
  }
})

export default SearchListItem;
