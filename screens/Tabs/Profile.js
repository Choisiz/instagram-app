import React,{useState} from "react";
import { gql, useQuery } from "@apollo/client";
import { USER_FRAGMENT } from "../../fragments";
import { RefreshControl,ScrollView} from "react-native";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";
import styles from "../../styles";

export const ME = gql`
    {
        me {
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

export default () => {
    const [refreshing, setRefreshing] = useState(false);
    const {data, loading, refetch} =useQuery(ME);
    const refresh = async() => {
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
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
        >
        { loading ? (
            <Loader/>
            ) : (
            data&&
            data.me &&
            <UserProfile {...data.me}/>
            )}
        </ScrollView>
    )
}