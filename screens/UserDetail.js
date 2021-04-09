import React,{useState} from "react";
import { gql,useQuery } from "@apollo/client";
import Loader from "../components/Loader";
import { RefreshControl,ScrollView } from "react-native";
import { USER_FRAGMENT } from "../fragments";
import UserProfile from "../components/UserProfile";
import styles from "../styles";

const GET_USER = gql`
    query seeUser($userName: String!) {
        seeUser(userName: $userName) {
            ...UserParts
            }
        }
        ${USER_FRAGMENT}
`;

export default ({route}) => {
    const [refreshing, setRefreshing] = useState(false);
    const {data,loading} =useQuery(GET_USER, {
        variables: {
            userName: route.params.userName
        }
    });
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
    style={{backgroundColor: styles.whiteColor}}
        refreshControl={
            <RefreshControl
                onRefresh={onRefresh}
                refreshing={refreshing}
            />
        }
    >
        {loading ? (
            <Loader/>
        ):(
           data && data.seeUser && <UserProfile {...data.seeUser}/>
        )}
    </ScrollView>
    )
}