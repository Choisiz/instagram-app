import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Text,View,Image} from "react-native";
import constants from "../screens/constants";
import { useNavigation } from '@react-navigation/native';
import styles from "../styles";
import { NavIcon5 } from "./NavIcon";


const ArrayImage =styled.View`
    display: flex;
    flex-direction: row;
`;

const IconContainer = styled.View`
    position: absolute;
    right: 5px;
    top: 5px;
`;

const CardSearch = ({files,id}) => {
    const navigation = useNavigation();
    return (
    <TouchableOpacity onPress={() => navigation.navigate("PostDetail",{id})}>
        {files[1] ? (
            <ArrayImage>
                <Image
                    source={{uri:files[0].url}}
                    style={{width: constants.width /3,
                            height: constants.height /6
                    }}
                />
                <IconContainer>
                <NavIcon5 
                    name={"checkbox-multiple-blank"}
                    size={23}
                    color={styles.whiteColor}
                />
                </IconContainer>
            </ArrayImage>
            ) : <Image 
                    source={{uri:files[0].url}}
                    style={{
                        width: constants.width /3,
                        height: constants.height /6,
                    }}
                />
            }
    </TouchableOpacity>
    );
};

export default CardSearch;
