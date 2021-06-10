import React, {
  useEffect,
  useState
}                                 from 'react';
import {
  useSelector,
  useDispatch
}                                 from 'react-redux';
import {
  View, StyleSheet,
  TouchableOpacity,
  ActivityIndicator, Text
}                                 from 'react-native';
import API                        from 'api/index';
import { THEME }                  from 'styles/theme';
import SearchListItem             from 'components/UI/SearchList/Item';
import { EnumType }               from 'json-to-graphql-query';
import AppSearchInput             from 'components/UI/Forms/SearchInput';
import { setModel }               from 'store/reducers/createVehicle';
import isEmpty                    from 'lodash/isEmpty';
import minBy                      from 'lodash/minBy';
import maxBy                      from 'lodash/maxBy';
import { Dimensions }             from 'react-native';

const yearContainerWidth = (Dimensions.get('window').width - 12*4)/3

export const CreateCarModificationScreen = ({ navigation }) => {
  const vehicleModifications = useSelector(state => state.vehicleModifications);
  const creatingVehicle = useSelector(state => state.creatingVehicle);
  const { manufacturer, model } = creatingVehicle;
  const dispatch = useDispatch();
  const [searchInputValue, setSearchInputValue] = useState('');
  const { loading, data } = vehicleModifications;
  const currentYear = new Date().getFullYear();

  console.log(vehicleModifications)

  const getModificationYears = () => {
    const minYear = minBy(data, 'startYear').startYear;
    const maxYear = (maxBy(data, 'endYear') || {}).endYear || currentYear;
    const yearsArray = [];

    for (let i = minYear; i <= maxYear; i++) {
      yearsArray.push(i);
    }

    return yearsArray;
  };

  useEffect(() => {
    if (manufacturer && manufacturer.name && model && model.name) {
      navigation.setOptions({ title: `${manufacturer.name} ${model.name} ${model.subbody}` })
    }
  }, [])

  useEffect(() => {
    dispatch(API.queries.vehicleModifications({
      where: {
        modelId: {
          eq: model.id
        }
      }
    }));
  }, [searchInputValue])

  const onPressSearchItem = (searchItem) => {
    console.log(searchItem)
    //dispatch(setModel({model: searchItem}))
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {onPressSearchItem(item)}}
      >
        <SearchListItem
          text={`${item.enginecode}`}
        />
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <If condition={loading}>
        <View style={styles.preloader_container}>
          <ActivityIndicator size="large" color={THEME.GRAY_30}/>
        </View>
      </If>
      <If condition={!loading && !isEmpty(vehicleModifications.data)}>
        <View style={styles.years_container}>
          <For each="year" of={getModificationYears()} index="index">
            <View key={year} style={styles.year}>
              <Text style={styles.year_text}>{year}</Text>
            </View>
          </For>
        </View>
      </If>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.BACKGROUND_COLOR
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
  years_container: {
    paddingLeft: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  year: {
    width: yearContainerWidth,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 12,
    marginRight: 12,
    shadowColor: THEME.SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 6,
  },
  year_text: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: THEME.FONT_COLOR,
    letterSpacing: 0.1,
    textAlign: 'center'
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
