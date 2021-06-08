import React, { useEffect }         from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet,
  FlatList
}                                   from 'react-native';
import API                          from 'api/index';
import { THEME }                    from 'styles/theme';
import SearchListItem               from 'components/UI/SearchList/Item';

export const CreateCarManufacturerScreen = ({ navigation }) => {
  const vehicleManufacturers = useSelector(state => state.vehicleManufacturers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(API.queries.vehicleManufacturers({
      where: {
        models: {
          modifications: {
            startYear: { gt: 0 },
          }
        }
      }
    }));
  }, [])

  const renderItem = ({item}) => {
    return (
      <SearchListItem text={item.name}/>
    )
  }

  return (
    <View style={styles.container}>
      <If condition={vehicleManufacturers.data}>
        <FlatList
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
    backgroundColor: '#fff',
    paddingHorizontal: 12
  }
})
