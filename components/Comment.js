import React from "react";
import { Image } from "react-native";
import styled from "styled-components";

const TextInput = styled.TextInput`
    width: 100%;
    height:50;
    font-size: 14px;
    borderWidth: 1;
    position: absolute
    bottom: 0
`;
const Views = styled.View`
  flex: 1;
`;

const Views11 = styled.View``;
const Touchable = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const Text = styled.Text`
  margin-left: 10px;
`;

const User = styled.Text`
  font-weight: bold;
  margin: 20px;
`;
const Comment = ({
  comments,
  id,
  onChangeText,
  value,
  onSubmitEditing = () => null,
}) => {
  return (
    <Views>
      {comments &&
        comments.map((comm) => (
          <Touchable key={comm.id}>
            <Image
              source={{ uri: comm.user.avatar }}
              style={{ height: 30, width: 30, borderRadius: 20 }}
            />
            <Text>
              <User>{comm.user.userName}</User>: {comm.text}
            </Text>
          </Touchable>
        ))}
      <Views11>
        <Text>{id}</Text>
        <TextInput //댓글달기
          placeholder={"댓글 달기"}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          value={value}
        />
      </Views11>
    </Views>
  );
};

export default Comment;
