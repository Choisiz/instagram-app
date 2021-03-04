import React from "react";
import styled from "styled-components";
import {Platform} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import {NavIcon} from "./NavIcon";

const Container = styled.TouchableOpacity`
    padding-right: 20px;
`;

export default () => {
    const navigation =useNavigation();
    return (
        <Container onPress={() => navigation.navigate("MessageNavigation")}>
            <NavIcon //메세지 로고
                name={"paper-plane-outline"}
                size={32}
            />
        </Container>
    );
};