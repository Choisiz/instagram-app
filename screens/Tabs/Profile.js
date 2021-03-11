import React,{useState} from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { USER_FRAGMENT } from "../../fragments";
import { RefreshControl,ScrollView} from "react-native";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";

export const ME = gql`
    {
        me {
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

export default () => {
    const {data, loading} =useQuery(ME);
    const [refreshing, setRefreshing] = useState(false);
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
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing}
               />
            }
        >
            {loading ? <Loader/> : data && data.me && <UserProfile {...data.me}/>}
        </ScrollView>
    )
};