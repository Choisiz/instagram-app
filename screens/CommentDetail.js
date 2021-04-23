import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
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
  return (
    <ScrollView
      style={{ backgroundColor: styles.whiteColor }}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <Comment {...comment} onChangeText={www} onSubmitEditing={onPress} />
    </ScrollView>
  );
};
