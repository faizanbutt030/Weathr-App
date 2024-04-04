import * as React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import Search from '../screens/Search/Search';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />
          </Stack.Navigator>
    );
};
export default Routes;
