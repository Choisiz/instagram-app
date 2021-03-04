import React from "react";
import { Ionicons,MaterialIcons, AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import styles from "../styles";

export const NavIcon = ({focused=true,name, color = styles.blackColor, size= 26}) => (
    <Ionicons name={name} color={color} size ={size} />
)

export const NavIcon2 = ({focused=true, name, color = styles.blackColor, size= 26}) => (
    <MaterialIcons name={name} color={color} size ={size} />
)

export const NavIcon3 = ({focused=true,name, color = styles.blackColor, size= 26}) => (
    <AntDesign name={name} color={color} size ={size} />
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