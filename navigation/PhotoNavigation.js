import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import styles from "../styles";
const MaterialNavigation = createMaterialTopTabNavigator();

const PhotoTabs = () => {
    return (
          <MaterialNavigation.Navigator 
            tabBarPosition="bottom"
            tabBarOptions={{
                indicatorStyle: {
                    backgroundColor: styles.orangeColor,
                    marginBottom: 5
                },
                labelStyle: {
                    fontWeight: "bold"
                },
            }}
          >
            <MaterialNavigation.Screen name ="사진" component={TakePhoto}/>
            <MaterialNavigation.Screen name ="갤러리" component={SelectPhoto}/>
          </MaterialNavigation.Navigator>
      );
};

const stack = createStackNavigator();

export default () => {
    return (
        <stack.Navigator >
            <stack.Screen name="PhotoTabs" component={PhotoTabs} options={{headerTitle: "갤러리"}}/>
            <stack.Screen name="UploadPhoto" component={UploadPhoto}/>            
        </stack.Navigator>
    )
}