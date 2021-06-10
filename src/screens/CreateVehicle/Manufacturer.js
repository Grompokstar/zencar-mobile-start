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
  FlatList, TouchableOpacity,
  ActivityIndicator, Text
}                                   from 'react-native';
import API                          from 'api/index';
import { THEME }                    from 'styles/theme';
import SearchListItem               from 'components/UI/SearchList/Item';
import { EnumType }                 from 'json-to-graphql-query';
import AppSearchInput               from 'components/UI/Forms/SearchInput';
import { setManufacturer }          from 'store/reducers/createVehicle';
import isEmpty                      from 'lodash/isEmpty';

export const CreateCarManufacturerScreen = ({ navigation }) => {
  const vehicleManufacturers = useSelector(state => state.vehicleManufacturers);
  const dispatch = useDispatch();
  const [searchInputValue, setSearchInputValue] = useState('');
  const { loading } = vehicleManufacturers;

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

  const onPressSearchItem = (searchItem) => {
    dispatch(setManufacturer({manufacturer: searchItem}))
    navigation.navigate('CreateCarModel')
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {onPressSearchItem(item)}}
      >
        <SearchListItem
          text={item.name}
        />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.search_container}>
        <AppSearchInput
          onChangeText={(text) => {setSearchInputValue(text)}}
          value={searchInputValue}
          placeholder="Поиск марки"
        />
      </View>

      <If condition={loading}>
        <View style={styles.preloader_container}>
          <ActivityIndicator size="large" color={THEME.GRAY_30}/>
        </View>
      </If>
      <If condition={!loading && !isEmpty(vehicleManufacturers.data)}>
        <FlatList
          style={styles.list_container}
          data={vehicleManufacturers.data}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
        />
      </If>
      <If condition={!loading && isEmpty(vehicleManufacturers.data) && searchInputValue}>
        <View style={styles.empty_container}>
          <Text style={styles.empty_text}>Ничего не найдено</Text>
        </View>
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
  preloader_container : {
    flex: 1,
    justifyContent: 'center'
  },
  list_container: {
    paddingHorizontal: 12
  },
  empty_container: {
    paddingHorizontal: 12,
    paddingVertical: 15
  },
  empty_text: {
    color: THEME.GRAY_50
  }
})
