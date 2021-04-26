import React from "react";
import { Image, KeyboardAvoidingView, ScrollView } from "react-native";
import styled from "styled-components";
const TextInput = styled.TextInput`
  width: 100%;
  height: 50;
  font-size: 14px;
  border: 1px solid;
  bottom: 0;
`;
const Views = styled.View`
  flex: 1;
`;
const View = styled.View`
  position: absolute;
  bottom: 10;
  left: 0;
  right: 0;
  padding: 20px;
  height: 80;
`;
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

const Sample = styled.Text``;
const Comment = ({
  comments,
  id,
  onChangeText,
  value,
  onSubmitEditing = () => null,
}) => {
  return (
    <Views>
      <ScrollView>
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
      </ScrollView>
      {/* <TextInput //댓글달기
          placeholder={"댓글 달기"}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          value={value}
        /> */}
    </Views>
  );
};

export default Comment;
