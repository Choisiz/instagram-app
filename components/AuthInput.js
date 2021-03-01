import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../screens/constants";

const Container = styled.View`
    margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
    background-Color: ${props => props.theme.greyColor};
    border: 1px solid ${props => props.theme.lightGreyColor};
    width:${constants.width / 2};
    padding: 10px;
    border-radius: 4px;
`;

const AuthInput = ({
        placeholder,
        value,
        keyboardTyped = "default",
        authCapitalize ="none",
        onChangeText,
        returnKeyType="done",
        onSubmitEditing = () => null,
        autoCorrect = true
    }) => (
    <Container>
        <TextInput 
            placeholder={placeholder}
            value={value}
            keyboardTyped={keyboardTyped} //키보드 결정
            authCapitalize={authCapitalize} //특정문자 자동으로 대문자표기
            onChangeText={onChangeText} //텍스트 변경시 호출 콜백
            returnKeyType={returnKeyType} //리턴키 모양 결정
            onSubmitEditing={onSubmitEditing} //텍스트 입력 끝날때 호출콜백
            autoCorrect={autoCorrect} //자동수정 활성여부
        />
    </Container>
);

AuthInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    keyboardTyped: PropTypes.oneOf([
        "default",
        "number-pad",
        "decimal-pad",
        "numeric",
        "email-address",
        "phone-pad",
        "ascii-capable",
        "numbers-and-punctuation",
        "url",
        "name-phone-pad",
        "twitter",
        "web-search",
        "visible-password",
    ]),
    authCapitalize: PropTypes.oneOf([
        "none",
        "sentences",
        "words",
        "characters"
    ]),
    onChangeText: PropTypes.func.isRequired,
    returnKeyType: PropTypes.oneOf([
        "done",
        "go",
        "next",
        "search",
        "send"
    ]),
    onSubmitEditing: PropTypes.func,
    autoCorrect: PropTypes.bool
};

export default AuthInput;