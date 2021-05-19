import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Alert, Image, ActivityIndicator, View } from "react-native";
import useInput from "../../hooks/useInput";
import constants from "../constants";
import styles from "../../styles";
import { FEED_QUERY } from "../Tabs/Home";
import { gql, useMutation } from "@apollo/client";

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $location: String) {
    upload(caption: $caption, files: $files, location: $location) {
      id
      caption
      location
    }
  }
`;

const UploadView = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding: 0px;
  flex-direction: column;
`;

const Form = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${styles.whiteColor};
`;

const CaptionInput = styled.TextInput`
  margin-bottom: 20px;
  border: 0px solid ${styles.blackColor};
  border-bottom-width: 1px;
  padding-bottom: 10px;
  padding-top: 10px;
  width: ${constants.width - 180};
`;

const Button = styled.TouchableOpacity`
    background-color: ${styles.blueColor}
    width: 200px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
`;

export default ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const onePhoto = route.params.photo;
  const ArrayPhoto = route.params.photo;
  const caption = useInput("");
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries: () => [{ query: FEED_QUERY }],
  });

  //if(onePhoto){ //사진 1개면
  //    console.log("hello");
  //}else{ //사진 n개면
  //    ArrayPhoto.filter(function(element){
  //    });
  //}

  //사진저장
  const handleSubmit = async () => {
    if (caption.value == "") {
      Alert.alert("All fields are required");
    }
    const formData = new FormData();
    formData.append("file", {
      name: onePhoto.filename,
      type: "image/jpg",
      uri: onePhoto.uri,
    });

    try {
      setLoading(true);
      const {
        data: { location },
      } = await axios({
        url: "https://instagramcky-backend.herokuapp.com/api/upload", //localhost 안됨
        method: "post",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      const {
        data: { upload },
      } = await uploadMutation({
        variables: {
          files: [location],
          caption: caption.value,
        },
      });

      if (upload.id) {
        navigation.navigate("TabNavigation");
      }
    } catch (e) {
      Alert.alert("업로드 할수 없습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <UploadView>
      <Container>
        <Image
          source={{ uri: onePhoto.uri }}
          style={{ width: constants.width, height: constants.height / 1.8 }}
        />
        <Form>
          <CaptionInput {...caption} placeholder="Caption" muliline={true} />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text>업로드</Text>
            )}
          </Button>
        </Form>
      </Container>
    </UploadView>
  );
};
