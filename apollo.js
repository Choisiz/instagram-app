import { HttpLink, ApolloLink, concat } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";

const httpLink = new HttpLink({
  uri: "https://instagramcky-backend.herokuapp.com",
});

const authLink = new ApolloLink(async (operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("jwt")}`,
    },
  });
  return forward(operation);
});

const apolloClientOptions = {
  link: concat(authLink, httpLink),
};

export default apolloClientOptions;

//const apolloClientOptions = {
// uri: "http://172.30.1.54:4000/",
// Android 에뮬레이터를 사용하는 경우 localhost를 사용하여 graphql에 접근할 수 없다
//ip주소
// onError: (e) => { console.log(e) },
//};

//export default apolloClientOptions;
