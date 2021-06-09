import React, {
  useEffect,
  useState
}                                   from 'react';
import {
  useSelector,
  useDispatch
}                                   from 'react-redux';
import {
  View, StyleSheet,
  FlatList, TextInput
}                                   from 'react-native';
import API                          from 'api/index';
import { THEME }                    from 'styles/theme';
import SearchListItem               from 'components/UI/SearchList/Item';
import AppInput                     from 'components/UI/Forms/Input';
import { EnumType }                 from 'json-to-graphql-query';
import AppSearchInput               from 'components/UI/Forms/SearchInput';

export const CreateCarManufacturerScreen = ({ navigation }) => {
  const vehicleManufacturers = useSelector(state => state.vehicleManufacturers);
  const dispatch = useDispatch();
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    dispatch(API.queries.vehicleManufacturers({
      where: {
        name: {
          contain: searchInputValue
        }
      },
      order: {
        priority: new EnumType('desc'),
        name: new EnumType('asc')
      }
    }));
  }, [searchInputValue])

  const renderItem = ({item}) => {
    return (
      <SearchListItem text={item.name}/>
    )
  }

  return (
    <View style={styles.container}>
      <If condition={vehicleManufacturers.data}>
        <View style={styles.search_container}>
          <AppSearchInput
            onChangeText={(text) => {setSearchInputValue(text)}}
            value={searchInputValue}
            placeholder="Поиск марки"
          />
        </View>
        <FlatList
          style={styles.list_container}
          data={vehicleManufacturers.data}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
        />
      </If>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  search_container: {
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    paddingBottom: 12,
    shadowColor: THEME.FONT_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  list_container: {
    paddingHorizontal: 12
  }
})
