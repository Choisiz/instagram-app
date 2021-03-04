import { gql,useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import Loader from "../../components/Loader";

const FEED_QUERY = gql`
    {
        seeFeed {
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
            commentCount
            isLiked
            comments {
                id
                text
                user{
                    id
                    userName
                }
            }
            createdAt
        }
    }
`;

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

export default () => {
    const {data, loading,error} = useQuery(FEED_QUERY);
    console.log(loading, data,error);
    return (
       <View>
            {loading ? <Loader/> : null}
       </View>
    )
}