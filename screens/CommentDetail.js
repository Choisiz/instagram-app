import React, { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import styled from "styled-components";
import Loader from "../components/Loader";
import styles from "../styles";
import Comment from "../components/Comment";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";
import useInput from "../hooks/useInput";

const ADD_COMMENT = gql`
  mutation addComment($text: String!, $postId: String!) {
    addComment(text: $text, postId: $postId) {
      id
      text
      user {
        userName
        avatar
      }
      post {
        commentCount
      }
    }
  }
`;

const TextInput = styled.TextInput`
  padding: 5px;
  width: 100%;
  height: 50;
  font-size: 14px;
  border: 1px solid;
  bottom: 0;
  background-color: white;
`;

export default ({ route }) => {
  const [newComments, setNewComments] = useState([]);
  const commentInput = useInput("");
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: {
      postId: route.params.id,
      text: newComments,
    },
  });
  const onPress = async (e) => {
    addCommentMutation();
  };

  const [refreshing, setRefreshing] = useState(false);
  const www = (value) => {
    setNewComments(value);
  };
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const comment = route.params;
  console.log(route);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: styles.whiteColor, flex: 1 }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <Comment {...comment} />
      </ScrollView>
      <TextInput
        placeholder={"댓글 달기"}
        onChangeText={www}
        onSubmitEditing={onPress}
      ></TextInput>
    </View>
  );
};
