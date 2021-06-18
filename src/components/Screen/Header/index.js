import PropTypes            from 'prop-types';
import React                from 'react';
import {
  View,
  Text,
  StyleSheet
}                           from 'react-native';
import { Ionicons }         from '@expo/vector-icons';
import  THEME               from 'styles/theme';

import CircleLogo           from 'components/SVG/CircleLogo';
import LogoText             from 'components/SVG/LogoText';

const ScreenHeader = () => {
  return (
    <View style={styles.root}>
      <View style={styles.logo}>
        <View style={{marginRight: 8}}>
          <CircleLogo/>
        </View>
        <LogoText/>
      </View>
      <View style={styles.right_container}>
        <Ionicons name='person-outline' color={THEME.GRAY} size={22}/>
        <View style={styles.bonuses_block}>
          <Ionicons name='gift-outline' color={THEME.WHITE} size={16}/>
          <Text style={styles.bonuses_amount}>0</Text>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  right_container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bonuses_block: {
    marginLeft: 24,
    flexDirection: 'row',
    backgroundColor: THEME.SECONDARY_COLOR,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6
  },
  bonuses_amount: {
    marginLeft: 5,
    color: THEME.WHITE,
    fontFamily: THEME.FONT_BOLD
  }
})

export default ScreenHeader;
