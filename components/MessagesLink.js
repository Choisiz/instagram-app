import React from "react";
import styled from "styled-components";
import {View, Text, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Container = styled.TouchableOpacity``;

export default () => {
    const navigation =useNavigation();
    return (
        <Container onPress={() => navigation.navigate("MessageNavigation")}>
            <Text>Messages</Text>
        </Container>
    );
};