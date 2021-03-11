import React, {useState} from "react";
import {RefreshControl, ScrollView} from "react-native";
import {NavIcon4 } from "../../components/NavIcon";
import SearchBar from "../../components/SearchBar";
import styles from "../../styles";
import {gql, useQuery } from "@apollo/client";
import Loader from "../../components/Loader";
import CardSearch from "../../components/CardSearch";

const SEARCH =gql`
    query search($term: String!) {
        searchPost(term: $term) {
            id
            files {
                url
            }
            likeCount
            commentCount
        }
        searchUser(term: $term) {
            id
            avatar
            userName
            isFollowing
            isSelf
        }
    }
`;


export default ({navigation}) => {
    const [term, setTerm] = useState("");
    const [shouldFetch, setShouldFetch] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const {data, loading, refetch} = useQuery(SEARCH,{
        variables: {term},
        skip: !shouldFetch,
        fetchPolicy: "network-only"
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

    const onChangeText = (text) => {
        setShouldFetch(false);
        setTerm(text);
    }
    const onSubmit = () => {
        setShouldFetch(true);
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft:() => (
                <NavIcon4 
                    style={{marginLeft: 15}}
                    size={24}
                    color={styles.blackColor}
                    name={"search"}
                />
            ),
            headerTitle: () => (
                <SearchBar
                    value={term}
                    onChangeText={onChangeText}
                    onSubmit={onSubmit}
                />
            ),
            headerTitleAlign : "center"
        });
    }, [navigation,term]);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                />
            }
        >
            {loading ? (
                <Loader/>
                ) : (
                    data && data.searchPost && data.searchPost.map(post => (
                    <CardSearch key={post.id} {...post}/>
                    ))
                )
            }
        </ScrollView>
    )
}