import React,{useState,useLayoutEffect} from "react";
import styled from "styled-components";
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from "expo-permissions";
import Loader from "../../components/Loader";
import {RefreshControl,Image, ScrollView, TouchableOpacity} from "react-native";
import constants from "../constants";
import styles from "../../styles";
import { NavIcon5 } from "../../components/NavIcon";
const View = styled.View`
    flex: 1;
`;

const AllPhotos = styled.ScrollView`
    marginTop: 5px;
    
`;

const UploadPhotoBtn = styled.TouchableOpacity`
width: 35px;
height 40px;
backgroundColor: ${styles.darkGreyColor}
border-radius:10px;
position: absolute;
right: 15px;
bottom: 285px;
justify-content: center;
align-items: center;
`;

const ArrayPhotoBtn = styled.TouchableOpacity`
width: 35px;
height 40px;
backgroundColor: ${styles.blueColor}
border-radius:10px;
position: absolute;
right: 15px;
bottom: 285px;
justify-content: center;
align-items: center;
`;

const Button = styled.TouchableOpacity`
    width: 100px;
    height 30px;
    backgroundColor: ${styles.blueColor}
    border-radius:5px;
    position: absolute;
    top: 15px;
    right: 15px;
    justify-content: center;
    align-items: center;
`

const ButtonText = styled.Text`
    color: white;
    font-size: 18px;
    font-weight: 700;
`;

const CheckBtn = styled.Text`
    width: 30px;
    height 30px;
    backgroundColor: ${styles.whiteColor}
    border-radius:20px;
    position: absolute;
    right: 10px;
    top: 15px;
`;

export default ({ navigation }) => {
    const [loading,setLoading] =useState(true); // 로딩
    const [hasPerimission, setHasPermission] = useState(false); //접근 권한 허용여부
    const [selected, setSelected] = useState([]); //선택사진
    const [manySelected, setManySelected] = useState([]); //배열사진
    const [allPhotos, setAllPhotos] =useState(); //모든사진
    const [array, setArray] =useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const refresh = async() => {
        try{
            setRefreshing(true);
            getPhotos();
            await refetch();
        }catch(e){
            console.log(e);
        }finally{
            setRefreshing(false);
        }
    }
    
    const choiceSelected = (photo) => { //사진 1개
        setSelected(photo);
    }

    const getPhotos = async() => { // 미디어 라이브러리 제공(엑세스, 저장)
        try{
            const {assets} = await MediaLibrary.getAssetsAsync({
                sortBy : [[MediaLibrary.SortBy.default, false]],
                }); //제공된기준과 일치하는 자신페이지 가져옴 
            const [firstPhoto] = assets;
            setSelected(firstPhoto); //선택사진
            setAllPhotos(assets); //모든사진
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

    const handleSelected = () => { // 1개 업로드
        navigation.navigate("UploadPhoto",{photo: selected})
    }

    const arrayChoice = () => {//한개 or 여러개 올리기 버튼
        if(array == true){
            setArray(false)
        }else{
            setArray(true)
        }
    }

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
                        array ? ( //1개 업로드
                        <> 
                            <Image 
                                style={{width: constants.width, height: constants.height /2}}
                                source={{uri: selected?.uri}}//선택 사진만
                            />
                            <Button onPress={handleSelected}>
                                <ButtonText>업로드</ButtonText>
                            </Button>
                            <UploadPhotoBtn onPress={arrayChoice}>
                                <NavIcon5 
                                    name={"checkbox-multiple-marked"}
                                    size={30}
                                    color={styles.whiteColor}
                                    />
                            </UploadPhotoBtn>
                            <AllPhotos 
                                contentContainerStyle={{flexDirection: "row",flexWrap: "wrap",}}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
                                }
                            >
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
                        ) : ( //n개 업로드( 구현 x)
                            <>
                            <Image
                                style={{width: constants.width, height: constants.height /2}}
                                source={{uri: selected?.uri}}
                            />
                            <Button onPress={handleSelected}>
                                <ButtonText>업로드</ButtonText>
                            </Button>
                            <ArrayPhotoBtn onPress={arrayChoice}>
                                    <NavIcon5 
                                    name={"checkbox-multiple-marked"}
                                    size={30}
                                    color={styles.whiteColor}
                                    />
                            </ArrayPhotoBtn>
                            <AllPhotos 
                                contentContainerStyle={{flexDirection: "row",flexWrap: "wrap",}}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
                                }
                            >
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
                                            <CheckBtn/>
                                    </TouchableOpacity>
                                ))}
                            </AllPhotos>
                        </>
                        )
                        ) :  null
                    }
                </View>
            )}
        </View>
    );
};