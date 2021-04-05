import React from "react";
import styled from "styled-components";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;
const Photo = styled.Image``;

export default ({navigation, route}) => {
    const ArrayPhoto = route.params.photo;
    console.log(route.params.photo.uri);
    //const result = ArrayPhoto.filter(function(element){
     //   console.log(element.uri);
    //});
    return (
       <View>
            <Text>업로드 해야함</Text>
       </View>
    )
};