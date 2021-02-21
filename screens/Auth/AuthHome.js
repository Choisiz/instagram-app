import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

export default ({navigation}) => (
       <View>
            <Text>AuthHome</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
                <Text>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("SignUp")}>
                <Text>회원가입</Text>
            </TouchableOpacity>
       </View>
);