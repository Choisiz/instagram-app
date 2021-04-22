import React from "react";
import { Image} from "react-native";
import styled from "styled-components";

const Views = styled.View``;
const Touchable = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;
`;

const Text = styled.Text`
    margin-left:10px;
`;

const User = styled.Text`
    font-weight: bold;
    margin:20px;
`;
const Comment = ({comments}) => {
    return(
        <Views>
            {comments && comments.map((comm)=> (
                <Touchable key={comm.id}>
                    <Image source={{uri: comm.user.avatar}} style={{height:30, width:30, borderRadius: 20}} />
                    <Text>
                        <User>{comm.user.userName}</User>: {comm.text}
                    </Text>
                </Touchable>
            ))}
        </Views>
    )
}

export default Comment;