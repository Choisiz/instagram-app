import React, {useState} from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { Image } from "react-native";
import Swiper from "react-native-swiper";
import constants from "../screens/constants";
import styles from "../styles";
import { NavIcon, NavIcon4 } from "./NavIcon";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/client";

const TOGGLE_LIKE = gql`
    mutation toggleLike($postId: String!) {
        toggleLike(postId: $postId)
    }
`;

const Container = styled.View`

`;
const Header = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;
const Touchable = styled.TouchableOpacity``;

const Bold = styled.Text`
    margin-left: 8px;
    font-size:16px;
    font-weight: bold;
`; 
const IconsContainer = styled.View`
    flex-direction: row;
    marginBottom: 2px;
`;

const IconContainer = styled.View`
    margin-right: 10px;
    background-color: white;
`;

const InfoContaier = styled.View`
    padding: 10px;
    marginTop: -65px;
`;

const LikeContainer = styled.View`
    marginBottom: 2px;
    
`;

const Caption = styled.Text`
    marginBottom: 2px;
    margin-left: 8px;
    font-size:15px;
    font-weight: normal;
`;
const CommentCount = styled.Text`
    margin-left: 8px;
    font-size:15px;
    font-weight: bold;
    opacity: 0.5;
`;

const CommentAll = styled.View`
`;


const Post = ({
    id,
    user,
    files=[],
    likeCount: likeCountProp,
    caption,
    comments,
    isLiked: isLikedProp,
    }) => {
    const {navigate} = useNavigation();
    const [isLiked, setIsLiked] =useState(isLikedProp);
    const [likeCount, setLikeCount] =useState(likeCountProp);
    const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
        variables: {
            postId: id
        }
    })
    const handleLike = async () => {
        if(isLiked === true){
            setLikeCount(l => l -1);
        }else {
            setLikeCount(l => l +1);
        }
        setIsLiked(p => !p);
        try{
            await toggleLikeMutation();
        }catch(e){}
    };
    return (
        <Container>

            <Header>
                <Touchable 
                    onPress={() => 
                        navigate("UserDetail",{userName: user.userName})
                    }
                >
                    <Image source={{uri: user.avatar}} style={{height:30, width:30, borderRadius: 20}} />
                </Touchable>
                <Touchable
                    onPress={() => 
                        navigate("UserDetail",{userName: user.userName})
                    }
                >
                    <Bold>{user.userName}</Bold>
                </Touchable>
            </Header>

            <Swiper 
                dotColor={styles.darkGreyColor}
                style={{ height: constants.height / 1.6 }}
            >
                {files.map(file => (
                    <Image
                    style={{width: constants.width, height: constants.height /1.8}}
                    key={file.id}
                    source={{uri: file.url}}
                    />
                ))}
            </Swiper>

            <InfoContaier>

                <IconsContainer>
                    <Touchable onPress={handleLike}>
                        <IconContainer>
                            <NavIcon
                                size={32} 
                                color={isLiked ? styles.redColor : styles.blackColor}
                                name={ isLiked ? "heart-sharp" : "heart-outline"}
                            />
                        </IconContainer>
                    </Touchable>
                    <Touchable>
                        <IconContainer>
                            <NavIcon4 size={30}name={"message-circle"} fontWeight={100}/>
                        </IconContainer>
                    </Touchable>
                    <Touchable>
                        <IconContainer>
                            <NavIcon size={32}name={"paper-plane-outline"}/>
                        </IconContainer>
                    </Touchable>
                </IconsContainer>

                <LikeContainer>
                    <Touchable>
                        <Bold>{likeCount === 0 ? "좋아요 0개" : `좋아요 ${likeCount}개`}</Bold>
                    </Touchable>
                    <Caption>
                        <Bold>{user.userName} </Bold> {caption} 
                    </Caption>
                </LikeContainer>

                <CommentAll>
                    <Touchable
                        onPress={() => 
                            navigate("CommentDetail",{comments: comments})
                        }
                    >
                        <CommentCount>댓글 {comments.length} 모두보기</CommentCount>
                    </Touchable>
                </CommentAll>

            </InfoContaier>

        </Container>

        
    )
}
export default Post;
