import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components";

const Text = styled.Text``;

export default ({route}) => {
    console.log(route);
    const commenta =route.params.comments;
    return (
        <ScrollView>
            {commenta && commenta.map((comm)=> (
                <Text>
                    {comm.text}
                    {comm.user.userName}
                </Text>
            ))}
        </ScrollView>
    )
}