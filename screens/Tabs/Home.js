import React from "react";
import { gql,useQuery } from "@apollo/client";
import styled from "styled-components";
import Loader from "../../components/Loader";
import {RefreshControl, ScrollView} from "react-native";
import styles from "../../styles";
import { useState } from "react/cjs/react.development";
import Post from "../../components/Post";
import { POST_FRAGMENT } from "../../fragments";

export const FEED_QUERY = gql`
    {
        seeFeed {
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;

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