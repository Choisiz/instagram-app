import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import constants from "../constants";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
    background-color: white;
`;

const Image = styled.Image`
    width: ${constants.width / 2.5};
    height: ${constants.height / 15};
    margin-bottom: 20px;
`;

const Touchable = styled.TouchableOpacity`
`;

const LoginLink = styled.View``;

const LoginLinkText =styled.Text`
    color: ${props => props.theme.blueColor};
    margin-top: 20px;
    font-weight:600;
`;

export default ({navigation}) => (
       <View>
           <Image resizeMode={"contain"} source={require("../../assets/logo.png")}/>
           <AuthButton text={"create New Account"} onPress={()=> navigation.navigate("Signup")}/>
           <Touchable>
               <LoginLink>
                   <LoginLinkText onPress={()=> navigation.navigate("Login")}>Log in</LoginLinkText>
               </LoginLink>
           </Touchable>
       </View>
);