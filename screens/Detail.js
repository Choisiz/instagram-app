import React from "react";
import { gql,useQuery } from "@apollo/client";
import styled from "styled-components";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView } from "react-native";

const SEE_FULL_POST = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
                id
                location
                caption
                user {
                    id
                    avatar
                    userName
                }
                files {
                    id
                    url
                }
                likeCount
                isLiked
                comments {
                    id
                    text
                    user {
                        id
                        userName
                    }
                }
            createdAt
            }
        }
`;

export default ({route}) => {
    const {data,loading} =useQuery(SEE_FULL_POST, {
        variables: {
            id: route.params.id
        }
    });
    console.log(data,loading);
    return (
    <ScrollView>
        {loading ? (
            <Loader/>
        ):(
           data && data.seeFullPost && <Post {...data.seeFullPost}/>
            //<Text>아이디는: {route.params.id}</Text>
        )}
    </ScrollView>
    )
}