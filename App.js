import React,{useState, useEffect} from "react";
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import  AsyncStorage  from  '@react-native-async-storage/async-storage';
import  {persistCache}  from  'apollo3-cache-persist' ;
import apolloClientOptions from "./apollo";
import {ApolloClient,InMemoryCache, ApolloProvider} from '@apollo/client';
import {ThemeProvider} from "styled-components";
import styles from "./styles";
import NavController from "./components/NavController";
import {AuthProvider, useIsLoggedIn} from "./AuthContext";
import AuthHome from "./navigation/AuthNavigation";
export default function App(){
  const [loaded, setLoaded] =useState(false);
  const [client, setClient] =useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async() => {
    await AsyncStorage.clear();
    try{
      await Font.loadAsync({
        ...Ionicons.font
      });
      await Asset.loadAsync([require("./assets/logo.png")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions
      });

      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if(!isLoggedIn || isLoggedIn ==="false"){
        setIsLoggedIn(false);
      }else{
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);

    }catch(e){
      console.log(e);
    }
  }

  useEffect(()=> {
    preLoad();
  },[]);
  

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
          </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading/>
  )
}