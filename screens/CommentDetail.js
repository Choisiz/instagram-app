import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";

const Text = styled.Text``;

export default ({route}) => {
    console.log(route);
    return (
        <ScrollView>
            <Text>dddd</Text>
        </ScrollView>
    )
}