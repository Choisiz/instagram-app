import React from "react";
import { MaterialCommunityIcons,Ionicons,MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

export const NavIcon = ({focused=true,name, onPress,color = styles.blackColor, size= 26}) => (
    <Ionicons onPress={onPress} name={name} color={color} size ={size} />
)

export const NavIcon2 = ({focused=true, name, color = styles.blackColor, size= 26}) => (
    <MaterialIcons name={name} color={color} size ={size} />
)

export const NavIcon3 = ({focused=true,name, color = styles.blackColor, size= 26}) => (
    <AntDesign name={name} color={color} size ={size} />
)

export const NavIcon4 = ({focused=true, name, color, size , style}) => (
    <Feather   name={name} color={color} size={size} style={style}/>
)

export const NavIcon5 = ({focused=true, name, color, size , style}) => (
    <MaterialCommunityIcons   name={name} color={color} size={size} style={style}/>
)

NavIcon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool
};

NavIcon2.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool
    
};

NavIcon3.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool
};

NavIcon4.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool
};

NavIcon5.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool
};