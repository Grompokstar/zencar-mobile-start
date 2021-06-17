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
import  THEME                     from 'styles/theme';
import isNull                     from 'lodash/isNull';
import isEmpty                    from 'lodash/isEmpty';
import minBy                      from 'lodash/minBy';
import maxBy                      from 'lodash/maxBy';
import uniq                       from 'lodash/uniq';
import filter                     from 'lodash/filter';
import { Dimensions }             from 'react-native';
import { addVehicle }             from 'store/reducers/garage';
import AsyncStorage               from '@react-native-async-storage/async-storage';

const yearContainerWidth = (Dimensions.get('window').width - 12*4)/3

export const CreateCarModificationScreen = ({ navigation }) => {
  const vehicleModifications = useSelector(state => state.vehicleModifications);
  const creatingVehicle = useSelector(state => state.creatingVehicle);
  const { manufacturer, model } = creatingVehicle;
  const dispatch = useDispatch();
  const { loading, data } = vehicleModifications;
  const currentYear = new Date().getFullYear();
  const [ year, setYear ] = useState(null);
  const [ fuel, setFuel ] = useState(null);
  const [ litres, setLitres ] = useState(null);
  const [ dinHp, setDinHp ] = useState(null);


  const fuelTypes = {
    P: 'Бензиновый',
    D: 'Дизельный'
  }

  const getModificationYears = () => {
    const minYear = minBy(data, 'startYear').startYear;
    const maxYear = (maxBy(data, 'endYear') || {}).endYear || currentYear;
    const yearsArray = [];

    for (let i = minYear; i <= maxYear; i++) {
      yearsArray.push(i);
    }

    return yearsArray;
  };

  const getFuelTypes = () => {
    const tmp = filter(data, (item) => {
      return year >= item.startYear  && year <= item.endYear
    })

    return uniq(tmp.map(item => item.fuel));
  };

  const getLitres = () => {
    let tmp = filter(data, (item) => {
      return year >= item.startYear  && year <= item.endYear && fuel === item.fuel
    })

    tmp = uniq(tmp.map(item => item.litres));

    return tmp.sort((a, b) => a - b);
  };

  const getDinHps = () => {
    let tmp = filter(data, (item) => {
      return year >= item.startYear  && year <= item.endYear && fuel === item.fuel && litres === item.litres
    })

    tmp = uniq(tmp.map(item => item.dinHp));

    return tmp.sort((a, b) => a - b);
  };

  const getResultModification = () => {
    const filteredModifications = filter(data, (item) => {
      return year >= item.startYear  && year <= item.endYear && fuel === item.fuel && litres === item.litres
        && dinHp === item.dinHp;
    });

    return filteredModifications[0]
  }

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
  }, [])

  useEffect(() => {
    async function setVehicle() {
      if (dinHp) {
        const modification = getResultModification();

        const vehicle = {
          ...creatingVehicle,
          modification
        }

        const garageVehicles = [
          vehicle
        ]

        //await AsyncStorage.removeItem('ZEN__garageVehicles')

        const vehiclesFromAsyncStorage = await AsyncStorage.getItem('ZEN__garageVehicles');

        if (vehiclesFromAsyncStorage) {
          const parsedVehicles = JSON.parse(vehiclesFromAsyncStorage);
          const updatedVehicles = [...parsedVehicles, vehicle];
          await AsyncStorage.setItem('ZEN__garageVehicles', JSON.stringify(updatedVehicles))
        } else {
          await AsyncStorage.setItem('ZEN__garageVehicles', JSON.stringify(garageVehicles))
        }

        navigation.navigate('Home', {screen: 'Main'});
      }
    }

    setVehicle()

  }, [dinHp])


  return (
    <View style={styles.container}>
      <If condition={loading}>
        <View style={styles.preloader_container}>
          <ActivityIndicator size="large" color={THEME.GRAY_30}/>
        </View>
      </If>

      <If condition={!loading && !isEmpty(vehicleModifications.data)}>
        <Choose>
          <When condition={isNull(year)}>
            <Text style={styles.header}>
              Год выпуска автомобиля
            </Text>
            <View style={styles.content_container}>
              <For each="year" of={getModificationYears()} index="index">
                <TouchableOpacity
                  key={year}
                  onPress={() => {setYear(year)}}
                >
                  <View style={yearTag}>
                    <Text style={styles.tag_text}>{year}</Text>
                  </View>
                </TouchableOpacity>
              </For>
            </View>
          </When>

          <When condition={!isNull(year) && isNull(fuel)}>
            <Text style={styles.header}>
              Тип двигателя
            </Text>
            <View style={styles.content_container}>
              <For each="fuel" of={getFuelTypes()} index="index">
                <TouchableOpacity
                  key={fuel}
                  onPress={() => {setFuel(fuel)}}
                >
                  <View style={styles.tag}>
                    <Text style={styles.tag_text}>{fuelTypes[fuel]}</Text>
                  </View>
                </TouchableOpacity>
              </For>
            </View>
          </When>

          <When condition={!isNull(fuel) && isNull(litres)}>
            <Text style={styles.header}>
              Объем двигателя
            </Text>
            <View style={styles.content_container}>
              <For each="litres" of={getLitres()} index="index">
                <TouchableOpacity
                  key={litres}
                  onPress={() => {setLitres(litres)}}
                >
                  <View style={styles.tag}>
                    <Text style={styles.tag_text}>{`${litres} л.`}</Text>
                  </View>
                </TouchableOpacity>
              </For>
            </View>
          </When>

          <When condition={!isNull(litres) && isNull(dinHp)}>
            <Text style={styles.header}>
              Мощность двигателя
            </Text>
            <View style={styles.content_container}>
              <For each="dinHp" of={getDinHps()} index="index">
                <TouchableOpacity
                  key={dinHp}
                  onPress={ async () => {
                    await setDinHp(dinHp);
                  }}
                >
                  <View style={styles.tag}>
                    <Text style={styles.tag_text}>{`${dinHp} л.c.`}</Text>
                  </View>
                </TouchableOpacity>
              </For>
            </View>
          </When>

          </Choose>
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
  content_container: {
    paddingLeft: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  header: {
    paddingHorizontal: 12,
    paddingTop: 12,
    color: THEME.FONT_COLOR,
    fontSize: 16,
    fontFamily: 'Montserrat-Medium'
  },
  tag: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
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
  tag_text: {
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

const yearTag = StyleSheet.flatten([
  styles.tag,
  {width: yearContainerWidth}
])
