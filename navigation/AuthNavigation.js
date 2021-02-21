import * as React from 'react';
import SignUp from "../screens/Auth/SignUp";
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
            <Stack.Screen name="AuthHome" component={AuthHome}/>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      )
};
