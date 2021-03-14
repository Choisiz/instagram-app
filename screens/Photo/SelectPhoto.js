import React,{useState,useLayoutEffect} from "react";
import styled from "styled-components";
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from "expo-permissions";
import Loader from "../../components/Loader";
import {Image, ScrollView, TouchableOpacity} from "react-native";
import constants from "../constants";
const View = styled.View`
    flex: 1;
`;

const AllPhotos = styled.ScrollView`
    marginTop: 5px
`;

const Text = styled.Text``;

export default () => {
    const [loading,setLoading] =useState(true); // 로딩
    const [hasPerimission, setHasPermission] = useState(false); //접근 권한 허용여부
    const [selected, setSelected] = useState(); //선택사진
    const [allPhotos, setAllPhotos] =useState(); //모든사진
    const choiceSelected = (photo) => {
        setSelected(photo);
    }
    const getPhotos = async() => { // 미디어 라이브러리 제공(엑세스, 저장)
        try{
            const {assets} = await MediaLibrary.getAssetsAsync(); //제공된기준과 일치하는 자신페이지 가져옴
            console.log({assets});
            const [firstPhoto] = assets;
            setSelected(firstPhoto);
            setAllPhotos(assets);
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    const askPermission = async() => { //접근권한
        try{
            const {status} = await Permissions.askAsync(Permissions.MEDIA_LIBRARY); //사용자의 이미지,비디오에 액세스
            if(status === "granted") {
                setHasPermission(true); //접근허용
                getPhotos();
            }
        }catch(e){
            console.log(e);
            hasPerimission(false); //접근실패
        }
    };

    useLayoutEffect(() => {
        askPermission();
    },[]);

    return (
        <View>
            {loading ? (
                <Loader/>
            ) : (
                <View>
                    {hasPerimission ? (
                        <>
                            <Image
                                style={{width: constants.width, height: constants.height /2}}
                                source={{uri: selected?.uri}}
                            />
                            <AllPhotos contentContainerStyle={{flexDirection: "row"}}>
                                {allPhotos.map(photo => (
                                    <TouchableOpacity 
                                        onPress={()=> choiceSelected(photo)}
                                        key={photo.id}
                                    >
                                        <Image 
                                            photoId={photo.id}
                                            source={{uri: photo.uri}}
                                            style={{width: constants.width /3,
                                                    height: constants.height /6,
                                                    opacity: photo.id === selected.id ? 0.5 : 1
                                                }}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </AllPhotos>
                        </>
                        ) :  null
                    }
                </View>
            )}
        </View>
    );
};