import React from "react";
import { gql,useQuery } from "@apollo/client";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { ScrollView } from "react-native";
import { POST_FRAGMENT } from "../fragments";

const SEE_FULL_POST = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
            ...PostParts
            }
        }
        ${POST_FRAGMENT}
`;

export default ({route}) => {
    const {data,loading} =useQuery(SEE_FULL_POST, {
        variables: {
            id: route.params.id
        }
    });
    
    return (
    <ScrollView>
        {loading ? (
            <Loader/>
        ):(
           data && data.seeFullPost && <Post {...data.seeFullPost}/>
        )}
    </ScrollView>
    )
}