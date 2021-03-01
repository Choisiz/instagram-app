import * as React from 'react';
import Signup from "../screens/Auth/Signup";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";
import Confirm from "../screens/Auth/Confirm";
import 'react-native-gesture-handler' ;
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


export default () => {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="AuthHome" component={AuthHome}/>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Confirm" component={Confirm} />
          </Stack.Navigator>
        </NavigationContainer>
      )
};
