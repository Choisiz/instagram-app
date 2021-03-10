import React from 'react';
import {Image, Platform, View} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import { createStackNavigator } from '@react-navigation/stack';
import MessagesLink from "../components/MessagesLink";
import {NavIcon,NavIcon2,NavIcon3} from '../components/NavIcon';
import { stackStyles } from './config';
import SearchBar from '../components/SearchBar';
import Detail from '../screens/Detail';

const Stack = createStackNavigator();
const TabNavigation = createBottomTabNavigator();

const stackFactory = (initalRoute, name, customConfig) => (
  <Stack.Navigator>
    <Stack.Screen
      name={name}
      component={initalRoute}
      options={{
        ...customConfig
        }}/>
    <Stack.Screen
      name="Detail"
      component={Detail}
      options={{
        headerTitle: "검색결과" //변경필요
        }}
    />
  </Stack.Navigator>
)


export default () => {
    return (
          <TabNavigation.Navigator tabBarOptions={{showLabel: false}}>

            <TabNavigation.Screen //Home
              name ="Home"
              options={{tabBarIcon: ({focused}) => (
                  <NavIcon //하단 홈버튼
                    focused={focused}
                    name={focused ? "home-sharp" : "home-outline"}
                    size={30}
                  />
              )}}
            >
              {()=> 
                stackFactory(Home, "Home", {
                  headerRight: () => <MessagesLink />,
                  headerTitle: () => 
                    <Image //인스타그램 로고
                      style={{height: 30, marginLeft:170}}
                      resizeMode="cover"
                      source={require("../assets/logo.png")}
                    />
                })
              }
            </TabNavigation.Screen>

            <TabNavigation.Screen //search
              name ="Search"
              options={{tabBarIcon: ({focused}) => (
                <NavIcon //하단 검색버튼
                  focused={focused}
                  name={focused? "search-sharp" : "search-outline"}
                  size={30}
                />
              )}}
            >
              {() => 
                stackFactory(Search, "Search", {
                })
              }
            </TabNavigation.Screen>

            <TabNavigation.Screen //Add
              name ="Add"
              options={{tabBarIcon: ({focused}) => (
                <NavIcon3 //하단 Add버튼
                  focused={focused}
                  name={"plussquareo"}
                  size={28}
                />
              )}}
              component={View}
              listeners={({ navigation}) => ({
              tabPress: e => {
                e.preventDefault();
                navigation.navigate("PhotoNavigation");
              },
            })}
            />

            <TabNavigation.Screen //Heart
              name ="Notifications"
              options={{tabBarIcon: ({focused}) => (
                <NavIcon //하단 좋아요 버튼
                  focused={focused}
                  name={focused ? "heart-sharp" : "heart-outline"}
                  size={32}
                />
              )}}
            >
              {() =>
                stackFactory(Notifications, "Notifications", {
                  title: "Notifications",
                })
              }
            </TabNavigation.Screen>

            <TabNavigation.Screen //Profile
              name ="Profile"
              options={{tabBarIcon: ({focused}) => (
                <NavIcon //하단 프로필 버튼
                  focused={focused}
                  name={focused ? "person" : "person-outline"}
                  size={32}
                />
              )}}
            >
              {() =>
                stackFactory(Profile, "Profile", {
                  title: "Profile",
                })
              }
            </TabNavigation.Screen>

          </TabNavigation.Navigator>
      );
};