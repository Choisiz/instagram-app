import { gql,useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import Loader from "../../components/Loader";
import {RefreshControl, ScrollView} from "react-native";
import styles from "../../styles";
import { useState } from "react/cjs/react.development";
import Post from "../../components/Post";

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
    const [refreshing, setRefreshing] = useState(false);
    const {data, loading, refetch} = useQuery(FEED_QUERY);
    const refresh = async() => {
        try{
            setRefreshing(true);
            await refetch();
        }catch(e){
            console.log(e);
        }finally{
            setRefreshing(false);
        }
    }
    console.log(loading, data);
    return (
       <ScrollView 
        style={{backgroundColor: styles.whiteColor}}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
        }
        >
            { loading ? (
                <Loader/>
                ) : (
                data &&
                data.seeFeed &&
                data.seeFeed.map(post => <Post key={post.id} {...post}/>)
                )}
       </ScrollView>
    )
}