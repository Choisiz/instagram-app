import React,{useState} from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import constants from "../screens/constants";
import styles from "../styles";
import CardSearch from "./CardSearch";
import { NavIcon, NavIcon4 } from "./NavIcon";
import Post from "./Post";

const HeaderContainer = styled.View`
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const HeaderInfo = styled.View`
    width: ${constants.width / 1.5}px;
    display: flex;
    flex-direction: row;
`;
const HeaderItem =styled.View`
    align-items: center;
    margin-left: 55px;
`;
const ItemCount =styled.Text`
    font-weight: 700;
    font-size: 18px;
    text-align: center;
`;
const ItemText = styled.Text`
    margin-top: 5px;
    font-size: 14px;
`;

const HeaderMeta =styled.View`
    margin-left: 20px;
`;

const ButtonContainer =styled.View`
    padding: 10px;
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: ${styles.lightGreyColor}
`;


const Button =styled.View`
    width: ${constants.width / 2.1};
    align-items: center;
`;

const GridItem =styled.View`
    display: flex;
    flex-direction: row;
`;


const UserProfile = ({
    avatar,
    postsCount,
    followersCount,
    followingCount,
    fullName,
    bio,
    posts
}) => {
    const [isGrid, setIsGrid] = useState(true);
    const toggleGrid = () => setIsGrid(i => !i);
    return (
        <View>
            <HeaderContainer>

                <Image source={{uri: avatar}} style={{height:100, width:100, borderRadius: 50}} />

                <HeaderInfo>
                    <HeaderItem>
                        <TouchableOpacity>
                            <ItemCount>{postsCount}</ItemCount>
                            <ItemText>게시물</ItemText>
                        </TouchableOpacity>
                    </HeaderItem>
                    <HeaderItem>
                        <TouchableOpacity>
                            <ItemCount>{followersCount}</ItemCount>
                            <ItemText>팔로워</ItemText>
                        </TouchableOpacity>
                    </HeaderItem>
                    <HeaderItem>
                        <TouchableOpacity>
                            <ItemCount>{followingCount}</ItemCount>
                            <ItemText>팔로잉</ItemText>
                        </TouchableOpacity>
                    </HeaderItem>                 
                </HeaderInfo>

            </HeaderContainer>

            <HeaderMeta>
                <ItemText>{fullName}</ItemText>
                <ItemText>{bio}</ItemText>
            </HeaderMeta>

            <ButtonContainer>
                <TouchableOpacity onPress={toggleGrid}>
                    <Button>
                        <NavIcon
                            color={isGrid ? styles.blackColor : styles.darkGreyColor}
                            name={"grid-outline"}
                            size={32}
                        />
                    </Button>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleGrid}>
                    <Button>
                        <NavIcon4 
                            color={!isGrid ? styles.blackColor : styles.darkGreyColor}
                            name={"tv"} 
                            size={32}
                        />
                    </Button>
                </TouchableOpacity>
                
            </ButtonContainer>
            {isGrid ? (
                <GridItem>
                    {posts && posts.map((post) => (
                        <CardSearch key={post.id} files={post.files} id={post.id} />
                    ))}
                </GridItem>
                ) : (
                    posts && posts.map((post) => (
                        <Post key={post.id} {...post} />  
                    ))
                )
            }
        </View>
    )
}

export default UserProfile;