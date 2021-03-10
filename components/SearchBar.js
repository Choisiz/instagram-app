import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-native";
import constants from "../screens/constants";
import styles from "../styles";

const SearchBar = ({value, onChangeText, onSubmit}) => (
    <TextInput
        style={{
            width: constants.width - 40,
            height: 35,
            marginLeft: 50,
            borderRadius: 10,
            fontSize: 18
        }}
        returnKeyType={"search"}
        value={value} 
        onChangeText={onChangeText}
        onEndEditing={onSubmit}
        placeholder={"검색"}
        placeholderTextColor={styles.darkGreyColor}
    />
);

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmit: PropTypes.func
};

export default SearchBar; 