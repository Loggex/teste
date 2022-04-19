
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Sen_400Regular, Sen_800ExtraBold, Sen_700Bold } from '@expo-google-fonts/sen';
import { Poppins_700Bold } from '@expo-google-fonts/poppins';
import { TextInputMask } from 'react-native-masked-text'
import api from '../services/api';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    useColorScheme,
    ImageBackground,
    Image,
    TextInput,
} from 'react-native';
import axios from 'axios';
import AsyncStorageLib from '@react-native-async-storage/async-storage';


export default function Login({ navigation }) {
    const [cell, setCell] = useState('');
    let [fontsLoaded] = useFonts({
        Sen_700Bold,
        Poppins_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }


    Login = async () => {

        const numero = cell.replace(/\D+/g, "");

        const requisicao = await api.post('/Login/Motorista', {
            telefone: numero
        })

        if (requisicao.status == 200) {
            console.warn('foi')
        } else {
            console.warn('não foi')

        }

        // const token = requisicao.data.meuToken

        // AsyncStorage.setItem('senai-SpMedicalGroup-chave-autenticacao', token)



        // try {
        //     const numero = cell.replace(/\D+/g, "");

        //     const teste = {
        //         telefone: numero
        //     }

        //     console.warn(teste)

        //     let headers = {
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         }
        //     }

        //     await api.post("/Login/Motorista", teste, headers)
        //         .then(response => console.debug(JSON.stringify(response)))
        //         .catch(error => console.debug(JSON.stringify(error)))

        //     // console.debug(requisicao.data)

        // } catch (err) {
        //     console.debug('erroooo')
        //     console.debug(err)
        // }


    }

    return (
        <View style={styles.container}>

            <Image source={require('../assets/logoLoggex.png')}
                style={styles.MainImgLogin}
            />
            <View>

                <Text style={styles.TextMain}> Acesse sua conta </Text>
            </View>

            <View style={styles.containerLogin}>


                <TextInputMask
                    style={styles.inputLogin}
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                    }}
                    placeholder='ex: (11) 12345-6789'
                    value={cell}
                    onChangeText={text => setCell(text)}

                />




                <TouchableOpacity
                    style={styles.btnLogin}
                    // onPress={() => navigation.navigate("SMS")}
                    onPress={() => Login()}
                >

                    <Text style={styles.LoginText}>Entrar</Text>

                </TouchableOpacity>
            </View>
            <StatusBar style="autos" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    MainImgLogin: {
        width: 234,
        height: 62.34
    },

    containerLogin: {
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: '4%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputLogin: {
        width: '100%',
        height: 50,
        marginBottom: 18,
        fontSize: 18,
        borderColor: '#F2F1FB',
        borderWidth: 1,
        borderRadius: 3,
        paddingLeft: 20
    },

    TextMain: {
        fontFamily: 'Sen_700Bold',
        color: '#140440',
        fontSize: 30,
        paddingVertical: 60
    },

    btnLogin: {
        backgroundColor: '#060657',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        borderRadius: 2
    },

    LoginText: {
        color: '#fff',
        fontFamily: 'Poppins_700Bold',
        fontSize: 18

    }

});

