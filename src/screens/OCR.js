import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import { LerConteudoImagem } from '../services/leituraOCR';
import * as FileSystem from 'expo-file-system';

export default function OCR() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [placa, setPlaca] = useState('')
    const [teste, setTeste] = useState({})
    const ref = useRef(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Sem acesso à camera</Text>;
    }

    const TakePicture = async () => {
        const foto = await ref.current.takePictureAsync()
        const options = {
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'file',
            headers: {
                "Content-Type": "multipart/form-data",
                "Ocp-Apim-Subscription-Key": "65679d72ba0245bbacadf9420515503d"
            }
        }

        await FileSystem.uploadAsync("https://ocr-loggex.cognitiveservices.azure.com/vision/v3.2/ocr?language=pt&detectOrientation=true&model-version=latest", foto.uri, options)
            .then(response => { console.debug(response.body) })

        // setTeste(response.body)
        // console.debug(response)
        // console.debug(teste)

        // response.body.regions.forEach(region => {
        //     region.lines.forEach(line => {
        //         line.words.forEach(word => {
        //             if (word.text.length === 7) {
        //                 setPlaca(word.text)
        //             }
        //         })
        //     })
        // })

        // console.log(placa)
    }

    return (
        <View style={styles.container}>
            <View style={styles.txtOcr}>
                <Text style={styles.titulo}>Escanear placa</Text>
                <Text style={styles.desc}>Aponte sua a câmera para a placa do veículo de modo que ela encaixe na região abaixo:</Text>
            </View>
            <Camera
                style={styles.camera}
                type={type}
                ref={ref}
            >
            </Camera>
            <TouchableOpacity onPress={TakePicture} style={styles.btnFoto}>
                <Text style={styles.btnTxt}>Tirar Foto</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '4%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#FFF'
    },
    camera: {
        flex: 0.9,
        width: '100%',
        borderRadius: 5,
        margin: 0

    },

    text: {
        fontSize: 18,
        color: 'white',
    },

    titulo: {
        fontSize: 20,
        fontFamily: 'Sen_700Bold',
        textAlign: 'center',
    },

    desc: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888888',
        fontFamily: 'Sen_400Regular'
    },

    txtOcr: {
        marginTop: 40,
        flexDirection: 'column',
        height: 90,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    btnFoto: {
        width: '100%',
        height: 51,
        backgroundColor: '#060657',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },

    btnTxt: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 18,
        color: '#FFF'
    }
});