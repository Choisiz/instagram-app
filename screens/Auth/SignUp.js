import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { TouchableWithoutFeedback, Keyboard,Alert } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {CREATE_ACCOUNT} from "./AuthQueries";
import * as Google from 'expo-google-app-auth';
import constants from "../constants";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const GoogleContainer = styled.View`
  width: ${constants.width / 2};
  margin-top: 20px;
  padding-top: 20px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.darkGreyColor};
  border-style: solid;
  align-items: center;
`;

export default ({route,navigation}) => {
    const firstNameInput = useInput(""); //firstName
    const lastNameInput = useInput(""); //lastName
    const emailInput = useInput(route.params?.email ?? ""); //email
    const userNameInput = useInput(""); //userName
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            userName: userNameInput.value,
            email: emailInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value
        }
    });
    const handleSignup = async() => {
        const {value: firstName} = firstNameInput;
        const {value: lastName} = lastNameInput;
        const {value: email} = emailInput;
        const {value: userName} = userNameInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        //유효성 검사
        if(firstName === ""){
            return Alert.alert("firstName를 입력해주세요");
        }
        if(lastName ===""){
            return Alert.alert("lastName를 입력해주세요");
        }
        if(userName ===""){
            return Alert.alert("userName를 입력해주세요");
        }
        if(email === ""){
            return Alert.alert("이메일을 입력하지 않았습니다.");
        }else if(!emailRegex.test(email)){
            return Alert.alert("유효하지 않은 이메일입니다.");
        }

        try{
            setLoading(true);
            const {
                data: {createAcount}
            } = await createAccountMutation();
            if(createAcount){
                Alert.alert("회원가입 완료!", "로그인 하세요");
                navigation.navigate("Login", {email});
            }
        }catch(e){
            console.log(e);
            Alert.alert("이미 있는 계정입니다.");
            navigation.navigate("Login", {email});
        }finally {
            setLoading(false);
        }
    };

    const googloeLogin = async() => {
        const GOOGLE_ID = "932805057837-ol2psq455o13ljgt3106026vb4kucq6k.apps.googleusercontent.com";
        try{
            setLoading(true);
            const result = await Google.logInAsync({
                androidClientId: GOOGLE_ID,
                scopes: ['profile', 'email']
            });
            if(result.type === "success"){
                const user = await fetch("https://www.googleapis.com/userinfo/v2/me",{
                    headers: {Authorization: `Bearer ${result.accessToken}`}
                });
                const {email,given_name,family_name} = await user.json();
                updataFormData(email,given_name,family_name);
                console.log(data);
            }else{
                return {cancelled: true};
            }
        } catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    };

    const updataFormData = (email, firstName, lastName) => {
        console.log("dd"+email,firstName,lastName);
        emailInput.setValue(email);
        firstNameInput.setValue(firstName);
        lastNameInput.setValue(lastName);
        const [userName] = email.split("@");
        userNameInput.setValue(userName);
    }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <AuthInput 
                {...firstNameInput}
                placeholder="firstName"
                autoCapitalize="words"
                />
                <AuthInput 
                {...lastNameInput}
                placeholder="LastName"
                autoCapitalize="words"
                />
                <AuthInput 
                {...emailInput}
                placeholder="Email"
                keyboardTyped="email-address"
                autoCorrect={false}
                />
                <AuthInput 
                {...userNameInput}
                placeholder="UserName"
                autoCorrect={false}
                />
            <AuthButton loading={loading} text="Sign Up" onPress={handleSignup} />
            <GoogleContainer>
                <AuthButton color={"#DE5246"} loading={loading} text="Google" onPress={googloeLogin} />
            </GoogleContainer>
        </View>
        </TouchableWithoutFeedback>
    );
};