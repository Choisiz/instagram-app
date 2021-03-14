import React,{useState,useEffect} from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import * as Permissions from "expo-permissions";
import { Camera } from 'expo-camera'
import Loader from "../../components/Loader";
import constants from "../constants";
import * as MediaLibrary from 'expo-media-library';
import { NavIcon } from "../../components/NavIcon";
import styles from "../../styles";

const View = styled.View`
    flex: 1;
`;

const CameraPhoto = styled(Camera)`
    width: ${constants.width}px;
    height: ${constants.height / 2.1}px;
    justify-content: flex-end;
    padding: 10px;
    
`;

export default ({navigation}) => {
    const [loading,setLoading] =useState(true); // 로딩
    const [hasPerimission, setHasPermission] = useState(false); //접근 권한 허용여부
    const [cameraType, setCameraType] =useState(Camera.Constants.Type.back);
    const askPermission = async() => { //접근권한
        try{
            const {status} = await Permissions.askAsync(Permissions.CAMERA); //사용자의 이미지,비디오에 액세스
            if(status === "granted") {
                setHasPermission(true); //접근허용
            }
        }catch(e){
            console.log(e);
            hasPerimission(false); //접근실패
        }finally{
            setLoading(false);
        }
    };
    const toggleType = () => {
        if(cameraType === Camera.Constants.Type.front){
           setCameraType(Camera.Constants.Type.back)
        }else {
           setCameraType(Camera.Constants.Type.front)
        }
    }
    useEffect(() => {
        askPermission();
    },[]);
    console.log("?"+hasPerimission);
    return (
       <View>
           {loading ? (
                <Loader/>
                ) : hasPerimission ? (
                    <CameraPhoto 
                        type={cameraType}
                    >
                        <TouchableOpacity onPress={toggleType}>          
                                <NavIcon name={"camera-reverse"} size={30} color={styles.whiteColor}/>  
                        </TouchableOpacity>
                    </CameraPhoto>
                ) : null}
       </View>
    );
};