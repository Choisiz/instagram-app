import React,{useState,useEffect,useRef} from "react";
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
    backgroundColor: white;
    justify-content: center;
    align-items: center;
`;

const CameraPhoto = styled(Camera)`
    width: ${constants.width}px;
    height: ${constants.height / 2.1}px;
    justify-content: flex-end;
    padding: 10px;
    
`;

const Button = styled.View`
    width: 80px;
    height: 80px;
    border-radius: 100px;
    border: 15px solid ${styles.lightGreyColor}
`;

export default ({navigation}) => {
    const cameraRef = useRef();
    const [loading,setLoading] =useState(true); // 로딩
    const [hasPerimission, setHasPermission] = useState(false); //접근 권한 허용여부
    const [cameraType, setCameraType] =useState(Camera.Constants.Type.back);
    const [canTakePhoto, setCanTakePhoto] =useState(true);
    const takePhoto = async() => {
        try{
            setCanTakePhoto(false);
            const {uri} = await cameraRef.current.takePictureAsync({
                quality: 1,
            });
            const asset = await MediaLibrary.createAssetAsync(uri);
            navigation.navigate("UploadPhoto", {photo: asset})
        }catch(e){
            console.log(e);
            setCanTakePhoto(true);
        }
    }
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

    return (
       <View>
           {loading ? (
                <Loader/> 
                ) : hasPerimission ? ( //접근허용시
                <>
                    <CameraPhoto
                        ref={cameraRef}
                        type={cameraType}
                    >
                        <TouchableOpacity onPress={toggleType}>          
                                <NavIcon name={"camera-reverse"} size={30} color={styles.whiteColor}/>  
                        </TouchableOpacity>
                    </CameraPhoto>
                    <View>
                    <TouchableOpacity onPress={takePhoto}>
                        <Button/>
                    </TouchableOpacity>    
                    </View>
                </>
                ) : null}
       </View>
    );
};