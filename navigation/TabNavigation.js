import React from 'react';
import {View} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import { createStackNavigator } from '@react-navigation/stack';
import MessagesLink from "../components/MessagesLink";

const Stack = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

const stackFactory = (initalRoute, name, customConfig) => (
  <Stack.Navigator>
    <Stack.Screen name={name} component={initalRoute} options={{...customConfig}}/>
  </Stack.Navigator>
)

export default () => {
    return (
          <TabNavigation.Navigator>
            <TabNavigation.Screen name ="Home">
              {()=> 
                stackFactory(Home, "Home", {
                  title: "Home",
                  headerRight: () => <MessagesLink />,
                })
              }
            </TabNavigation.Screen>
            <TabNavigation.Screen name ="Search">
              {() => 
                stackFactory(Search, "Search", {
                  title: "Search"
                })
              }
            </TabNavigation.Screen>
            <TabNavigation.Screen name ="Add" component={View}
              listeners={({ navigation}) => ({
              tabPress: e => {
                e.preventDefault();
                navigation.navigate("PhotoNavigation");
              },
            })}
            />
            <TabNavigation.Screen name ="Notifications">
              {() =>
                stackFactory(Notifications, "Notifications", {
                  title: "Notifications",
                })
              }
            </TabNavigation.Screen>
            <TabNavigation.Screen name ="Profile">
              {() =>
                stackFactory(Profile, "Profile", {
                  title: "Profile",
                })
              }
            </TabNavigation.Screen>
          </TabNavigation.Navigator>
      );
};