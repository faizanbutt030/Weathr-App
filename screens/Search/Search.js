import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  FlatList,
  StatusBar
} from 'react-native';
import SearchStyles from './SearchStyles';
import {Subject, from} from 'rxjs';
import {debounceTime, switchMap, catchError} from 'rxjs/operators';
import {saveLocationStatus} from '../../utils/AsyncStorageUtil';

const Search = ({navigation}) => {
  const styles = SearchStyles();
  const [cityControl, setCityControl] = useState('');
  const [cityAutoSuggestions, setCityAutoSuggestions] = useState([]);

  const citySubject = new Subject();
  const fetchCitySuggestions = (cityNamePrefix) => {
    return from(
      fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityNamePrefix}&limit=10`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
          },
        },
      )
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => data.data)
        .catch(error => {
          console.error(error);
          return [];
        }),
    );
  };

  const setupCitySuggestionsEffect = () => {
    const subscription = citySubject
      .pipe(
        debounceTime(300),
        switchMap(cityNamePrefix => fetchCitySuggestions(cityNamePrefix)),
        catchError(error => {
          console.error(error);
          return [];
        }),
      )
      .subscribe(cities => {
        setCityAutoSuggestions([...cities]);
      });

    return () => subscription.unsubscribe();
  };

  useEffect(() => {
    setupCitySuggestionsEffect();
  }, [cityControl]);

  // useEffect(() => {
  //   const subscription = citySubject
  //     .pipe(
  //       debounceTime(300),
  //       switchMap(cityNamePrefix =>
  //         from(
  //           fetch(
  //             `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityNamePrefix}&limit=10`,
  //             {
  //               method: 'GET',
  //               headers: {
  //                 'X-RapidAPI-Key':
  //                   '',
  //                 'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
  //               },
  //             },
  //           )
  //             .then(response => {
  //               if (!response.ok) {
  //                 throw new Error('Network response was not ok');
  //               }
  //               return response.json();
  //             })
  //             .then(data => data.data) // Adjust according to your API response structure
  //             .catch(error => {
  //               console.error(error);
  //               return [];
  //             }),
  //         ),
  //           ),
  //       catchError(error => {
  //         console.error(error);
  //         return [];
  //       }),
  //     )
  //     .subscribe(cities => {
  //       setCityAutoSuggestions([...cities]);
  //     });

  //   return () => subscription.unsubscribe();
  // }, [cityAutoSuggestions,cityControl]);

  const handleCityInputChange = text => {
    setCityControl(text);
    citySubject.next(text);
  };
  const handleCitySelect = selectedCity => {
    saveLocationStatus(selectedCity);
    navigation.navigate('Home');
  };

  
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        style={styles.p1}
        source={require('../../assets/city_bg.png')}>
        <View style={styles.s_v}>
          <TextInput
            style={styles.intput} // Fix typo her
            placeholderTextColor={'white'}
            placeholder="Search City"
            value={cityControl}
            onChangeText={handleCityInputChange}
          />
          <Image
            style={styles.search}
            source={require('../../assets/search.png')}
          />
        </View>

        {/* Conditional rendering of FlatList */}
        {cityAutoSuggestions.length > 0 && (
          <FlatList
            style={styles.flt_list}
            data={cityAutoSuggestions}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <Text style={styles.sug} onPress={() => handleCitySelect(item)}>
                {item.name}, {item.country}
              </Text>
            )}
          />
        )}
      </ImageBackground>
    </View>
  );
};
export default Search;
