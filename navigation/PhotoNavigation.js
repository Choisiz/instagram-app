import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";

const MaterialNavigation = createMaterialTopTabNavigator();

const PhotoTabs = () => {
    return (
          <MaterialNavigation.Navigator tabBarPosition="bottom">
            <MaterialNavigation.Screen name ="SelectPhoto" component={SelectPhoto}/>
            <MaterialNavigation.Screen name ="TakePhoto" component={TakePhoto}/>
          </MaterialNavigation.Navigator>
      );
};

const stack = createStackNavigator();

export default () => {
    return (
        <stack.Navigator headerMode="none">
            <stack.Screen name="PhotoTabs" component={PhotoTabs}/>
            <stack.Screen name="UploadPhoto" component={UploadPhoto}/>            
        </stack.Navigator>
    )
}