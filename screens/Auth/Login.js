import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { TouchableWithoutFeedback, Keyboard,Alert } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {LOG_IN} from "./AuthQueries";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default ({navigation}) => {
    const emailInput = useInput("");
    const [loading, setLoading] = useState(false);
    const [requestSecretMutation] =useMutation(LOG_IN, {
        variables: {
            email: emailInput.value
        }
    })
    const handleLogin = async() => {
        const {value} = emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(value === ""){
            return Alert.alert("이메일을 입력하지 않았습니다.");
        }else if(!emailRegex.test(value)){
            return Alert.alert("유효하지 않은 이메일입니다.");
        }
        try{
            setLoading(true);
            const {
                data: {requestSecret}
            } = await requestSecretMutation();
            if(requestSecret){
                Alert.alert("이메일을 확인하세요");
                navigation.navigate("Confirm", { email: value });   
            }else {
                Alert.alert("찾을 수 없습니다.");
                navigation.navigate("Signup", { email: value });
            }
        }catch(e){
            console.log(e);
            Alert.alert("로그인 불가");
        }finally {
            setLoading(false);
        }
    };

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <AuthInput 
                {...emailInput}
                placeholder="Email"
                keyboardTyped="email-address"
                returnKeyType="send"
                onSubmitEditing={handleLogin}
                autoCorrect={false}
                />
            <AuthButton loading={loading} text="Log In" onPress={handleLogin} />
        </View>
        </TouchableWithoutFeedback>
    );
};