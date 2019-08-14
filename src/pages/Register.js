
import React from 'react';
import { KeyboardAvoidingView, ToastAndroid, Platform, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native'
import api from '../services/api'
import { AsyncStorage } from '@react-native-community/async-storage'

var username = ''
var password = ''
var repeatPassword = ''
export default function Register ({ navigation }) {
    
    async function handleLogin () {
        
        //const response = await api.post('/users', { username: user })
       if(username.length != 0){
            if(password.length != 0){
                if(repeatPassword.length != 0){
                    if(repeatPassword == password){
                        if(createProfile()){
                            ToastAndroid.show('Perfil Criado', ToastAndroid.SHORT);

                            try {
                                await AsyncStorage.setItem('username', username);
                                await AsyncStorage.setItem('password', password);
                            } catch (error) {
                                // Error saving data
                            }

                            navigation.navigate("Main")
                        }else{
                            ToastAndroid.show('Tente novamente mais tarde', ToastAndroid.SHORT);
                        }
                    }else{
                        ToastAndroid.show('Senhas diferentes', ToastAndroid.SHORT);
                    }
                }else{
                    ToastAndroid.show('Repita a senha', ToastAndroid.SHORT);
                }
            }else{
                ToastAndroid.show('Digite a senha', ToastAndroid.SHORT);
            }
       }else{
        ToastAndroid.show('Digite o usuário', ToastAndroid.SHORT);
       }
    }
    function createProfile(){
        return true
    }

  return (
    <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS === 'ios'}
        style={styles.container}>
            <TextInput placeholder="Digite seu username"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={val => username = val}
            style={styles.input}
            />
            <TextInput placeholder="Digite sua senha"
            placeholderTextColor="#999"
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={val => password = val}
            style={styles.input}
            />
            <TextInput placeholder="Digite sua senha novamente"
            placeholderTextColor="#999"
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={val => repeatPassword = val}
            style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} >
                <Text style={styles.buttontext}>Entrar</Text>
            </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
/* Password
<TextInput placeholder="Digite sua senha"
            placeholderTextColor="#999"
            autoCapitalize="none"
            secureTextEntry={true}
            autoCorrect={false}
            style={styles.input}
            />
*/
const styles = StyleSheet.create({
    container:{
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        padding: 30,
        backgroundColor: '#ccc'
    },
    input:{
        height:46,
        alignSelf: "stretch",
        backgroundColor: "#FFF",
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 4,
        marginTop: 10,
        paddingHorizontal: 15,
    },
    button:{
        height:46,
        alignSelf: "stretch",
        backgroundColor: '#DF4723',
        borderRadius: 4,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    buttontext:{
        color: "#FFF",
        fontWeight: 'bold',
        fontSize: 16
    },
    buttontextCreateAccount: {
        color: "#000",
        fontWeight: 'bold',
        fontSize: 16
    },
})