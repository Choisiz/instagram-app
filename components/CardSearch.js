import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Image} from "react-native";
import constants from "../screens/constants";
import { useNavigation } from '@react-navigation/native';

const CardSearch = ({files,id}) => {
    const navigation = useNavigation();
    return (
    <TouchableOpacity onPress={() => navigation.navigate("Detail",{id})}>
        <Image 
            source={{uri:files[0].url}}
            style={{width: constants.width /3, height: constants.height /6}}
        />
    </TouchableOpacity>
    );
};

export default CardSearch;
