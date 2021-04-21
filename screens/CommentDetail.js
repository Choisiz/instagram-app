import React, {useState} from "react";
import { RefreshControl,ScrollView } from "react-native";
import styled from "styled-components";
import Loader from "../components/Loader";
import styles from "../styles";
import Comment from "../components/Comment";
const Text = styled.Text``;

export default ({route}) => {
    const [refreshing, setRefreshing] =useState(false);
    const onRefresh = async () => {
        try{
            setRefreshing(true);
            await refetch();
        }catch(e){
            console.log(e);
        }finally{
            setRefreshing(false);
        }
    }
    const comment =route.params;
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
            <Comment {...comment}/>
        </ScrollView>
    )
}