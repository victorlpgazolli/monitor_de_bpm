import React,{ useEffect } from 'react';
import { KeyboardAvoidingView, ToastAndroid,  Platform ,StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

var username = ''
var password = ''
export default function Login ({ navigation }) {
    useEffect(() => {
        try{
            AsyncStorage.getItem('username').then(user => {
                if (user) {
                  navigation.navigate('Main', { user })
                }
              })
        }catch(err){
            
        }
        
      }, []);
    
   
      async function handleLogin () {
        //const response = await api.post('/users', { username: user })
       if(username.length != 0){
            if(password.length != 0){
                if(checkIfExists()){
                    try {
                        await AsyncStorage.setItem('username', username);
                        await AsyncStorage.setItem('password', password);
                    } catch (error) {
                        console.log("error saving data:" + error);
                    }
                    navigation.navigate("Main")
                }else{
                    ToastAndroid.show('Perfil não encontrado', ToastAndroid.SHORT);
                }
            }else{
                ToastAndroid.show('Digite a senha', ToastAndroid.SHORT);
            }
       }else{
        ToastAndroid.show('Digite o usuário', ToastAndroid.SHORT);
       }
    }
    function handleRegister(){
        navigation.navigate("Register")
    }
    function checkIfExists(){
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
            style={styles.input}
            onChangeText={val => password = val}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} >
                <Text style={styles.buttontext}>Fazer login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegister} >
                <Text style={styles.buttontextCreateAccount}>Criar conta ></Text>
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