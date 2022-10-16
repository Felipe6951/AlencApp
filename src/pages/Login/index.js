import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity, Text, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, FormControl, StatusBar } from 'native-base';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Divider from '../../components/Divider/Divider'
import styles from './styles';

import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';
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
      })
      .catch(error => {
        console.log(error)
        Alert.alert(error.message);
      })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Auxiliar')
      }
    })
  }, []);

  const forgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => Alert.alert("Redefinir senha", "Enviamos um e-mail para você"))
      .catch(error => console.log(error))
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={30}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoPosition}>
            <Image style={styles.logo} source={require('../../assets/img/logo_afc.png')} resizeMode="contain" />
          </View>

          <View style={styles.formFields}>
            <FormControl.Label>Email ou usuário</FormControl.Label>
            <Input
              placeholder="Seu email ou usuário"
              variant="outline"
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={(text) => setEmail(text)}
              backgroundColor={'#F2F2F2'}
              style={styles.input}
            />
          </View>

          <View style={styles.formFields}>
            <FormControl.Label>Senha</FormControl.Label>
            <Input
              placeholder="Sua senha"
              onChangeText={(text) => setPassword(text)}
              variant="outline"
              autoCapitalize='none'
              secureTextEntry={hidePassword}
              backgroundColor={'#F2F2F2'}
              style={styles.input}
              InputRightElement={
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                  style={styles.buttonEye}
                >
                  {hidePassword ?
                    <Ionicons name='eye' style={styles.iconEye} />
                    :
                    <Ionicons name='eye-off' style={styles.iconEye} />
                  }
                </TouchableOpacity>
              } />
          </View>

          <View style={styles.boxLogin}>
            <TouchableOpacity style={styles.buttonLogin} onPress={handleSignin}>
              <AntDesign name="login" size={18} style={styles.iconButtonLogin} />
              <Text style={styles.textButtonEnter}>Entrar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.boxActions}>
            <Text style={styles.textActions}>Esqueceu seus dados de login?</Text>
            <TouchableOpacity onPress={forgotPassword}>
              <Text style={styles.buttonActions}>Recuperar acesso</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.boxGlobal}>

            <Divider />

            <View style={styles.boxActions}>
              <Text style={styles.textActions}>Não tem uma conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonActions}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView >
  );
}
