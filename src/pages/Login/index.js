import React, { useState } from 'react';
import { View, StyleSheet, Image, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input } from 'native-base';
import { Ionicons, AntDesign  } from '@expo/vector-icons';

import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)

  const handleSignin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      navigation.navigate('Auxiliar')
    })
    .catch(error => {
      console.log(error)
      Alert.alert(error.message);
    })
  }

  const forgotPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => Alert.alert("Redefinir senha", "Enviamos um e-mail para você"))
    .catch(error => console.log(error))
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={{ alignSelf: 'center', marginTop: 90, marginBottom: 40 }}>
        <Image
          source={require('../../assets/img/logo_afc.png')}
          style={{ width: 180, height: 200 }}
          resizeMode="contain"
        />
      </View>

      <View style={{ marginHorizontal: 24 }}>
            <View style={{ marginBottom: 16 }}>
              <Input
                onChangeText={(text) => setEmail(text)}
                variant="filled"
                placeholder="Email ou nome de usuário"
                fontSize={15}
                style={{ backgroundColor: '#F2F2F2' }}
                autoCapitalize='none'
                keyboardType='email-address'
              />
            </View>

            <View>
              <Input
                variant="filled"
                placeholder="Senha"
                style={{ backgroundColor: '#F2F2F2', paddingLeft: 12 }}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={hidePassword}
                fontSize={15}
                autoCapitalize='none'
                InputRightElement={
                  <TouchableOpacity
                    style={{ marginRight: 12 }}
                    onPress={() => setHidePassword(!hidePassword)}>
                    {hidePassword ?
                      <Ionicons name='eye' color={'#505050'} size={25} />
                      :
                      <Ionicons name='eye-off' color={'#505050'} size={25} />
                    }
                  </TouchableOpacity>
                }
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                style={{ backgroundColor: '#C0212E', width: 312, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
                onPress={handleSignin}>
                  <AntDesign name="login" size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Entrar</Text>
              </TouchableOpacity>
            </View>        

        <View style={{ flexDirection: 'row', marginTop: 24, justifyContent: 'center' }}>
          <Text style={{ color: '#505050', fontSize: 12, marginRight: 4 }}>Esqueceu seus dados de login?</Text>
          <TouchableOpacity onPress={forgotPassword}>
            <Text style={{ color: '#505050', fontSize: 12, fontWeight: 'bold' }}>Recuperar acesso</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 136}}>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: 288, alignSelf: 'center' }} />

          <View style={{ flexDirection: 'row', marginTop: 16, justifyContent: 'center' }}>
            <Text style={{ color: '#505050', fontSize: 12, marginRight: 4 }}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{ color: '#505050', fontSize: 12, fontWeight: 'bold' }}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  teste: {
    borderColor: 'red'
  }
})