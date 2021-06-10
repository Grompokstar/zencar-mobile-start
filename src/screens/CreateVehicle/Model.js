import React, {
  useEffect,
  useState
}                        from 'react';
import {
  useSelector,
  useDispatch
}                        from 'react-redux';
import {
  View, StyleSheet,
  FlatList, TouchableOpacity,
  ActivityIndicator, Text
}                     from 'react-native';
import API            from 'api/index';
import { THEME }      from 'styles/theme';
import SearchListItem from 'components/UI/SearchList/Item';
import { EnumType }   from 'json-to-graphql-query';
import AppSearchInput from 'components/UI/Forms/SearchInput';
import { setModel }   from 'store/reducers/createVehicle';
import isEmpty        from 'lodash/isEmpty';

export const CreateCarModelScreen = ({ navigation }) => {
  const vehicleModels = useSelector(state => state.vehicleModels);
  const creatingVehicle = useSelector(state => state.creatingVehicle);
  const { manufacturer } = creatingVehicle;
  const dispatch = useDispatch();
  const [searchInputValue, setSearchInputValue] = useState('');
  const { loading } = vehicleModels;

  useEffect(() => {
    if (manufacturer && manufacturer.name) {
      navigation.setOptions({ title: manufacturer.name })
    }
  }, [])

  useEffect(() => {
    dispatch(API.queries.vehicleModels({
      where: {
        name: {
          contain: searchInputValue
        },
        manufacturerId: {
          eq: manufacturer.id
        }
      },
      order: {
        name: new EnumType('asc')
      }
    }));
  }, [searchInputValue])

  const onPressSearchItem = (searchItem) => {
    dispatch(setModel({model: searchItem}));
    navigation.navigate('CreateCarModification')
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {onPressSearchItem(item)}}
      >
        <SearchListItem
          text={`${item.name} ${item.subbody}`}
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
          placeholder="Поиск модели"
        />
      </View>
      <If condition={loading}>
        <View style={styles.preloader_container}>
          <ActivityIndicator size="large" color={THEME.GRAY_30}/>
        </View>
      </If>
      <If condition={!loading && !isEmpty(vehicleModels.data)}>
        <FlatList
          style={styles.list_container}
          data={vehicleModels.data}
          renderItem={renderItem}
          keyExtractor={item => String(item.id)}
        />
      </If>
      <If condition={!loading && isEmpty(vehicleModels.data) && searchInputValue}>
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
  list_container: {
    paddingHorizontal: 12
  },
  preloader_container : {
    flex: 1,
    justifyContent: 'center'
  },
  empty_container: {
    paddingHorizontal: 12,
    paddingVertical: 15
  },
  empty_text: {
    color: THEME.GRAY_50
  }
})
