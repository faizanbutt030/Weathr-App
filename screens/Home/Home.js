import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import dmns from './HomeStyles';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';
import {getLocationStatus} from '../../utils/AsyncStorageUtil';
import {useFocusEffect} from '@react-navigation/native';


const Home = ({navigation}) => {
  const [today, setToday] = useState(false);
  const [tomorrow, setTomorrow] = useState(false);
  const [tenDays, setTenDays] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [date, setDate] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [hour, setHour] = useState(null);
  const [tomorrowd, setTomorrowd] = useState('');
  const [todayd, setTodayd] = useState('');
  

  const moment = require('moment-timezone');
  const {city, country, id, latitude, longitude} = userLocation || {};

  const styles = dmns();

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      checkLocationStatus();
    }, []),
  );
  useEffect(() => {
    if (userLocation) {
      fetchDateTime();
    }
    if (latitude && longitude) {
      fetchWeatherData();
    }
  }, [userLocation]);

  const fetchWeatherData = async () => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=15897a3f0dcbc64e2fe5c9a8934667ae`;
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        nextdate(data.current.dt);
      } else {
        console.error('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error while fetching weather data:', error.message);
    }
  };

  const checkLocationStatus = async () => {
    const hasSetLocation = await getLocationStatus();

    setUserLocation(hasSetLocation);

    if (!hasSetLocation) {
      // If the user hasSetLocationhas not set the location, navigate to the Search screen
      navigation.navigate('Search');
    } else if (hasSetLocation) {
      // If a location is set, use it
      setUserLocation(hasSetLocation);
    } else if (route.params && route.params.selectedLocation) {
      // If a location is selected from the Search screen, use it
      setUserLocation(route.params.selectedLocation);
    }
  };

  const fetchDateTime = async () => {
    try {
      const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${id}/dateTime`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '58c4fbaf6dmshb5a9dfb1db79d31p1e1449jsna4d56ac55d6e',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      };
      const response = await fetch(url, options);
      const result = await response.json();

      const dateObject = new Date(result.data);
      const forming = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };

      const formattedDate = dateObject.toLocaleDateString('en-US', forming);
      setDate(formattedDate);

      const dateObject1 = new Date(result.data);
      dateObject1.setMinutes(0, 0);
      const timestamp = Math.floor(dateObject1.getTime() / 1000);
      setHour(timestamp);
    } catch (error) {
      console.error(error);
    }
  };


  const sun = (val) => {
    const dateObject = moment.unix(val).tz(weatherData.timezone);
    const formattedTime = dateObject.format('h:mm A');
    return formattedTime;
};

  const time = val => {
    const dateObject = moment.unix(val).tz(weatherData.timezone);;
    const formattedTime = dateObject.format('h:mm A');
    return formattedTime;
  };

  const htime = val => {
    const dateObject = moment.unix(val).tz(weatherData.timezone);;
    const formattedHours = dateObject.format('h');
    return formattedHours;
  };

  const hampm = val => {
    const dateObject = moment.unix(val).tz(weatherData.timezone);;
    const ampm = dateObject.format('A');
    return ampm;
  };

  const nextdate = val => {
    const formattedDate = new Date(val * 1000);
    formattedDate.setUTCHours(0, 0, 0, 0);
    const thisDate = formattedDate / 1000;
    setTodayd(thisDate);
    formattedDate.setDate(formattedDate.getUTCDate() + 1);
    const Datee = Math.floor(formattedDate.getTime() / 1000);
    setTomorrowd(Datee.toString());
  };

  const week = val => {
    const timestamp = val;
    const date = new Date(timestamp * 1000);

    const options = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.format(date);

    return formattedDate;
  };

  const getIcons = val => {
    if (val == '01d') {
      return require(`../../assets/01d.png`);
    } else if (val == '01d') {
      return require(`../../assets/01d.png`);
    } else if (val == '01n') {
      return require(`../../assets/01n.png`);
    } else if (val == '02d') {
      return require(`../../assets/02d.png`);
    } else if (val == '02n') {
      return require(`../../assets/02n.png`);
    } else if (val == '03d') {
      return require(`../../assets/03d.png`);
    } else if (val == '03n') {
      return require(`../../assets/03n.png`);
    } else if (val == '04d') {
      return require(`../../assets/04d.png`);
    } else if (val == '04n') {
      return require(`../../assets/04n.png`);
    } else if (val == '09d') {
      return require(`../../assets/09d.png`);
    } else if (val == '09n') {
      return require(`../../assets/09n.png`);
    } else if (val == '10d') {
      return require(`../../assets/10d.png`);
    } else if (val == '10n') {
      return require(`../../assets/10n.png`);
    } else if (val == '11d') {
      return require(`../../assets/11d.png`);
    } else if (val == '11n') {
      return require(`../../assets/11n.png`);
    } else if (val == '13d') {
      return require(`../../assets/13d.png`);
    } else if (val == '13n') {
      return require(`../../assets/13n.png`);
    } else if (val == '50d') {
      return require(`../../assets/50d.png`);
    } else if (val == '50n') {
      return require(`../../assets/50n.png`);
    }
  };

  // -------------------------------------------------slow down return ahead ------------------------------------

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.v1}>
        <ImageBackground
          style={styles.p1}
          imageStyle={{
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
          source={require('../../assets/p1.png')}>
          <View style={styles.cntr}>
            <View style={styles.loc_search}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Search');
                }}>
                <Text style={styles.loc}>
                  {city}, {country}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Search');
                }}>
                <Image
                  style={styles.search}
                  source={require('../../assets/search.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.tempCloud_v}>
              <View style={styles.TempView}>
                <Text style={styles.temp}>
                  {weatherData && parseInt(weatherData.current.temp - 273)}°{' '}
                  <Text style={styles.feels}>
                    feels like{' '}
                    {weatherData &&
                      parseInt(weatherData.current.feels_like - 273)}
                    °
                  </Text>
                </Text>
              </View>

              <View>
                {weatherData && (
                  <Image
                    style={styles.weatherImg}
                    source={getIcons(weatherData.current.weather[0].icon)}
                  />
                )}
                <Text style={styles.weather_type}>
                  {weatherData && weatherData.current.weather[0].main}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.cntr}>
            <View style={styles.end_v}>
              <Text style={styles.date_text}> {date}</Text>

              <View>
                <Text style={styles.d_n_t}>
                  Day{' '}
                  {weatherData && parseInt(weatherData.daily[0].temp.day - 273)}
                  °
                </Text>
                <Text style={styles.d_n_t}>
                  Night{' '}
                  {weatherData &&
                    parseInt(weatherData.daily[0].temp.night - 273)}
                  °
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.down_container}>
          <View style={styles.day_btns}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setToday(!today);
                setTomorrow(false);
                setTenDays(false);
              }}>
              <View style={today ? styles.btnActive : styles.checking}>
                <Text style={styles.days_txt}>Today</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setTomorrow(!tomorrow);
                setToday(false);
                setTenDays(false);
              }}>
              <View style={tomorrow ? styles.btnActive : styles.checking}>
                <Text style={styles.days_txt}>Tomorrow</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setTenDays(!tenDays);
                setTomorrow(false);
                setToday(false);
              }}>
              <View style={tenDays ? styles.btnActive : styles.checking}>
                <Text style={styles.days_txt}>8 Days</Text>
              </View>
            </TouchableOpacity>
          </View>

          {today == false && tomorrow == false && tenDays == false ? (
            <View>
              <View style={styles.info_wrpper}>
                <View style={styles.info_v}>
                  <View style={styles.info_v1}>
                    <View style={styles.info_ico}>
                      <View style={styles.ico_v}>
                        <Image
                          style={styles.ico_wind}
                          source={require('../../assets/wind.png')}
                        />
                      </View>
                    </View>
                    <View style={styles.info_det}>
                      <Text style={styles.info_txt}>Wind speed</Text>
                      <Text style={styles.info_txt}>
                        {weatherData && weatherData.current.wind_speed} m/h
                      </Text>
                    </View>
                    <View style={styles.info_end}>
                      <Image
                        style={styles.arrow}
                        source={require('../../assets/ad.png')}
                      />
                      <Text style={styles.info_end_txt}>2 m/h</Text>
                    </View>
                  </View>
                  <View style={styles.info_v1}>
                    <View style={styles.info_ico}>
                      <View style={styles.ico_v}>
                        <Image
                          style={styles.ico}
                          source={require('../../assets/rainy.png')}
                        />
                      </View>
                    </View>
                    <View style={styles.info_det}>
                      <Text style={styles.info_txt}>Humidity</Text>
                      <Text style={styles.info_txt}>
                        {weatherData && weatherData.daily[0].humidity}%
                      </Text>
                    </View>
                    <View style={styles.info_end}>
                      <Image
                        style={styles.arrow}
                        source={require('../../assets/au.png')}
                      />
                      <Text style={styles.info_end_txt}>10%</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.info_v}>
                  <View style={styles.info_v1}>
                    <View style={styles.info_ico}>
                      <View style={styles.ico_v}>
                        <Image
                          style={styles.ico}
                          source={require('../../assets/waves.png')}
                        />
                      </View>
                    </View>
                    <View style={styles.info_det}>
                      <Text style={styles.info_txt}>Pressure</Text>
                      <Text style={styles.info_txt}>
                        {weatherData && weatherData.daily[0].pressure} hpa
                      </Text>
                    </View>
                    <View style={styles.info_end}>
                      <Image
                        style={styles.arrow}
                        source={require('../../assets/au.png')}
                      />
                      <Text style={styles.info_end_txt}>32 hpa</Text>
                    </View>
                  </View>
                  <View style={styles.info_v1}>
                    <View style={styles.info_ico}>
                      <View style={styles.ico_v}>
                        <Image
                          style={styles.ico}
                          source={require('../../assets/light.png')}
                        />
                      </View>
                    </View>
                    <View style={styles.info_det}>
                      <Text style={styles.info_txt}>UV Index</Text>
                      <Text style={styles.info_txt}>
                        {weatherData && weatherData.daily[0].uvi}
                      </Text>
                    </View>
                    <View style={styles.info_end}>
                      <Image
                        style={styles.arrow}
                        source={require('../../assets/ad.png')}
                      />
                      <Text style={styles.info_end_txt}>0.3</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.cntr}>
                <View style={styles.hourly_v}>
                  <View style={styles.hour_highlight}>
                    <Image
                      style={styles.hour_img}
                      source={require('../../assets/hourly.png')}
                    />
                    <Text style={styles.hour_highlight_txt}>
                      Hourly Forecast
                    </Text>
                  </View>

                  <View style={styles.hour_v_container}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      {weatherData &&
                        hour &&
                        weatherData.hourly.map((items, index) => {
                          return (
                            index <= 10 &&
                            items.dt == parseInt(hour) + 3600 * index && (
                              <View key={index} style={styles.hour1_v}>
                                {index == 0 ? (
                                  <Text style={styles.h_high}>Now</Text>
                                ) : (
                                  <Text style={styles.h_high}>
                                    {htime(items.dt)}
                                    <Text style={styles.ampm}>
                                      {hampm(items.dt)}
                                    </Text>
                                  </Text>
                                )}
                                <Image
                                  style={styles.h_img}
                                  source={getIcons(items.weather[0].icon)}
                                />
                                <Text style={styles.h_dsc}>
                                  {parseInt(items.temp - 273)}°
                                </Text>
                              </View>
                            )
                          );
                        })}
                    </ScrollView>
                  </View>
                </View>
              </View>

              <View style={styles.info_v}>
                <View style={styles.info_v1}>
                  <View style={styles.info_ico}>
                    <View style={styles.ico_v}>
                      <Image
                        style={styles.ico_wind}
                        source={require('../../assets/sunrise.png')}
                      />
                    </View>
                  </View>
                  <View style={styles.info_det}>
                    <Text style={styles.info_txt}>Sunrise</Text>
                    <Text style={styles.info_txt}>
                      {weatherData && sun(weatherData.current.sunrise)}
                    </Text>
                  </View>
                </View>
                <View style={styles.info_v1}>
                  <View style={styles.info_ico}>
                    <View style={styles.ico_v}>
                      <Image
                        style={styles.ico_wind}
                        source={require('../../assets/sunset.png')}
                      />
                    </View>
                  </View>
                  <View style={styles.info_det}>
                    <Text style={styles.info_txt}>Sunset</Text>
                    <Text style={styles.info_txt}>
                      {weatherData && sun(weatherData.current.sunset)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
          {today === true &&
            tomorrow === false &&
            tenDays === false &&
            weatherData &&
            todayd !== '' && (
              <View>
                {Array.from({length: 24}).map((_, i) => {
                  for (let j = 0; j < weatherData.hourly.length; j++) {
                    if (
                      weatherData.hourly[j].dt ===
                      parseInt(todayd) + 3600 * i
                    ) {
                      return (
                        <View key={j}>
                          <View style={styles.det_card}>
                            <View style={styles.det_v1}>
                              <Text style={styles.h_high}>
                                {time(weatherData.hourly[j].dt)}
                              </Text>
                              <Text style={styles.det_dsc}>
                                {weatherData.hourly[j].weather[0].description}
                              </Text>
                            </View>

                            <View style={styles.det_temp}>
                              <Text style={styles.det_temp_txt}>
                                {parseInt(weatherData.hourly[j].temp) - 273}°
                              </Text>
                            </View>

                            <View style={styles.line_v}>
                              <Image
                                style={styles.line}
                                source={require('../../assets/line.png')}
                              />
                            </View>
                            <View style={styles.det_img_v}>
                              <Image
                                style={styles.det_img}
                                source={getIcons(
                                  weatherData.hourly[j].weather[0].icon,
                                )}
                              />
                            </View>
                          </View>
                        </View>
                      );
                    }
                  }
                  return null; // Return null if the condition is not met for the current iteration
                })}
              </View>
            )}
          {today == false &&
            tomorrow == true &&
            tenDays == false &&
            weatherData &&
            tomorrowd !== '' && (
              <View>
                {Array.from({length: 24}).map((_, i) => {
                  for (let j = 0; j < weatherData.hourly.length; j++) {
                    if (
                      weatherData.hourly[j].dt ===
                      parseInt(tomorrowd) + 3600 * i
                    ) {
                      return (
                        <View key={j}>
                          <View style={styles.det_card}>
                            <View style={styles.det_v1}>
                              <Text style={styles.h_high}>
                                {time(weatherData.hourly[j].dt)}
                              </Text>
                              <Text style={styles.det_dsc}>
                                {weatherData.hourly[j].weather[0].description}
                              </Text>
                            </View>

                            <View style={styles.det_temp}>
                              <Text style={styles.det_temp_txt}>
                                {parseInt(weatherData.hourly[j].temp) - 273}°
                              </Text>
                            </View>

                            <View style={styles.line_v}>
                              <Image
                                style={styles.line}
                                source={require('../../assets/line.png')}
                              />
                            </View>
                            <View style={styles.det_img_v}>
                              <Image
                                style={styles.det_img}
                                source={getIcons(
                                  weatherData.hourly[j].weather[0].icon,
                                )}
                              />
                            </View>
                          </View>
                        </View>
                      );
                    }
                  }
                  return null; // Return null if the condition is not met for the current iteration
                })}
              </View>
            )}
          {today == false &&
            tomorrow == false &&
            tenDays == true &&
            weatherData &&
            tomorrowd !== '' && (
              <View>
                {weatherData.daily.map((dailyItem, index) => (
                  <View key={index}>
                    <View style={styles.det_card}>
                      <View style={styles.det_v1}>
                        <Text style={styles.h_high}>{week(dailyItem.dt)}</Text>
                        <Text style={styles.det_dsc}>
                          {dailyItem.weather[0].description}
                        </Text>
                      </View>

                      <View style={styles.det_temp}>
                        <Text style={styles.det_temp_txt}>
                          {parseInt(dailyItem.temp.min) - 273}°
                        </Text>
                        <Text style={styles.det_temp_txt}>
                          {parseInt(dailyItem.temp.max) - 273}°
                        </Text>
                      </View>

                      <View style={styles.line_v}>
                        <Image
                          style={styles.line}
                          source={require('../../assets/line.png')}
                        />
                      </View>

                      <View style={styles.det_img_v}>
                        <Image
                          style={styles.det_img}
                          source={getIcons(dailyItem.weather[0].icon)}
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
        </View>
      </ScrollView>
    </View>
  );
};
export default Home;

