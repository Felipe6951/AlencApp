import React, { useState } from 'react';
import { View, StyleSheet, Image, SafeAreaView, TouchableOpacity, Text, Alert, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, FormControl, StatusBar } from 'native-base';
import { Ionicons, AntDesign } from '@expo/vector-icons';

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

  const { width } = Dimensions.get('screen')

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: 'center', marginHorizontal: 24 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={{ alignSelf: 'center', marginTop: 58, marginBottom: 32 }}>
            <Image
              source={require('../../assets/img/logo_afc.png')}
              style={{ width: 180, height: 200 }}
              resizeMode="contain"
            />
          </View>

          <View style={{ marginBottom: 8 }}>
            <FormControl.Label>Email ou usuário</FormControl.Label>
            <Input
              placeholder="Seu email ou usuário"
              onChangeText={(text) => setEmail(text)}
              fontSize={15}
              variant="outline"
              autoCapitalize='none'
              keyboardType='email-address'
              backgroundColor={'#F2F2F2'}
              placeholderTextColor={'#888888'}
              
            />
          </View>

          <View>
            <FormControl.Label>Senha</FormControl.Label>
            <Input
              placeholder="Sua senha"
              onChangeText={(text) => setPassword(text)}
              fontSize={15}
              variant="outline"
              autoCapitalize='none'
              secureTextEntry={hidePassword}
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
              backgroundColor={'#F2F2F2'}
              placeholderTextColor={'#888888'}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={{ backgroundColor: '#C0212E', height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
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

          <View style={{ marginTop: 116, marginBottom: 24 }}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: width / 1.3, alignSelf: 'center' }} />
            <View style={{ flexDirection: 'row', marginTop: 16, justifyContent: 'center' }}>
              <Text style={{ color: '#505050', fontSize: 12, marginRight: 4 }}>Não tem uma conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{ color: '#505050', fontSize: 12, fontWeight: 'bold' }}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
})