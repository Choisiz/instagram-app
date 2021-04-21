import React,{useState} from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import constants from "../screens/constants";
import styles from "../styles";

const Views = styled.View``;
const Text = styled.Text`
    padding: 20px;
`;

const User = styled.Text`
    font-weight: bold;
`;
const Comment = ({comments}) => {
    return(
        <Views>
            {comments && comments.map((comm)=> (
                <Text><User>{comm.user.userName}</User>   {comm.text}</Text>
            ))}
        </Views>
    )
}

export default Comment;