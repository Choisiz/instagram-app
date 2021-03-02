import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { TouchableWithoutFeedback, Keyboard,Alert } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {CREATE_ACCOUNT} from "./AuthQueries";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default ({route,navigation}) => {
    const fNameInput = useInput(""); //firstName
    const lNameInput = useInput(""); //lastName
    const emailInput = useInput(route.params?.email ?? ""); //email
    const uNameInput = useInput(""); //userName
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            userName: uNameInput.value,
            email: emailInput.value,
            firstName: fNameInput.value,
            lastName: lNameInput.value
        }
    });
    const handleSignup = async() => {
        const {value: fName} = fNameInput;
        const {value: lName} = lNameInput;
        const {value: email} = emailInput;
        const {value: uName} = uNameInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        //유효성 검사
        if(fName === ""){
            return Alert.alert("firstName를 입력해주세요");
        }
        if(lName ===""){
            return Alert.alert("lastName를 입력해주세요");
        }
        if(uName ===""){
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

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <AuthInput 
                {...fNameInput}
                placeholder="firstName"
                returnKeyType="send"
                autoCapitalize="words"
                />
                <AuthInput 
                {...lNameInput}
                placeholder="LastName"
                returnKeyType="send"
                autoCapitalize="words"
                />
                <AuthInput 
                {...emailInput}
                placeholder="Email"
                keyboardTyped="email-address"
                returnKeyType="send"
                autoCorrect={false}
                autoCapitalize=""
                />
                <AuthInput 
                {...uNameInput}
                placeholder="UserName"
                returnKeyType="send"
                autoCorrect={false}
                />
            <AuthButton loading={loading} text="Sign Up" onPress={handleSignup} />
        </View>
        </TouchableWithoutFeedback>
    );
};