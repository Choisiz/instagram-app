import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import { TouchableWithoutFeedback, Keyboard,Alert } from "react-native";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import {CONFIRM_SECRET} from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

export default ({route,navigation}) => {
    const confirmInput = useInput("");
    const logIn = useLogIn();
    const [loading, setLoading] = useState(false);
    const [confirmSecretMutation] = useMutation(CONFIRM_SECRET,{
        variables: {
            email: route.params.email,
            secret: confirmInput.value,
        }
    });

    const handleConfirm = async() => {
        const {value} = confirmInput;
        if(value === "" || !value.includes(" ")){
            return Alert.alert("다시 입력해주세요");
        }
        try{
            setLoading(true);
            const {
                data: {confirmSecret}
            } = await confirmSecretMutation();
            if(confirmSecret !=="" || confirmSecret !== false){
                console.log("된다");
                logIn(confirmSecret);
            }else{
                Alert.alert("Wrong secret");
            }
        }catch(e){
            console.log(e);
            Alert.alert("Cant confirm secert");
        }finally {
            setLoading(false);
        }
    };

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
            <AuthInput 
                {...confirmInput}
                placeholder="Secert"
                returnKeyType="send"
                onSubmitEditing={handleConfirm}
                autoCorrect={false}
                />
            <AuthButton loading={loading} text="Confirm" onPress={handleConfirm} />
        </View>
        </TouchableWithoutFeedback>
    );
};