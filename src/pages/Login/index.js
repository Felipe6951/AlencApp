import React, { useState, useRef, useEffect } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity, Text, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, FormControl, StatusBar, Button, Actionsheet, useDisclose } from 'native-base';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import styles from './styles';

import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, onSnapshot, where, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app)
  const auth = getAuth(app)

  const handleSignin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error)
        Alert.alert(
          "ERROR",
          "Email ou senha incorretos.",
          [
            {
              text: "FECHAR",
              onPress: () => null,
            },
          ]
        );
      })
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(firestore, "membros"), where("email", "==", user.email));
        onSnapshot(q, (querySnapshot) => {
          const members = [];
          querySnapshot.forEach((doc) => {
            members.push(doc.data().type);
          })

          if (members[0] === "Organizador") {
            navigation.navigate("Admin")
          } else {
            if (members[0] === "Jogador") {
              navigation.navigate("Geral")
            } else {
              if (members[0] === "membro") {
                // alert('Espera')
                navigation.navigate("Espera")
              } else {
                if (members[0] === "Recusado") {
                  // alert('Recusado')
                  navigation.navigate("Recusado")
                }
              }
            }
          }
        })
      }
    })
    return subscriber;
  }, []);

  const forgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => Alert.alert("Redefinir senha", "Enviamos um e-mail para você"))
      .catch(error => console.log(error))
  }

  const { isOpen, onOpen, onClose } = useDisclose();

  const [focus, setFocus] = useState(false);
  const customActionSheet = focus ? styles.actionSheetFocus : null

  const inputPassword = useRef();

  return (
    <SafeAreaView style={styles.back}>
      <StatusBar />

      <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={30}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoPosition}>
            <Image style={styles.logo} source={require('../../assets/img/logo_afc.png')} resizeMode="contain" />
          </View>

          <View style={styles.formFields}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              placeholder="Seu email"
              variant="outline"
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={(text) => setEmail(text)}
              backgroundColor={'#F2F2F2'}
              style={styles.input}
              returnKeyType='next'
              onSubmitEditing={() => { inputPassword.current.focus(); }}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.formFields}>
            <FormControl.Label>Senha</FormControl.Label>
            <Input
              placeholder="Sua senha"
              onChangeText={(text) => setPassword(text)}
              ref={inputPassword}
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
            <TouchableOpacity onPress={onOpen}>
              <Text style={styles.buttonActions}>Recuperar acesso</Text>
            </TouchableOpacity>
          </View>

          <Actionsheet isOpen={isOpen} onClose={onClose} style={customActionSheet}>
            <Actionsheet.Content style={{ paddingHorizontal: 24 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: "#C0212E" }}>Recuperar acesso</Text>
              <Text style={{ color: "#505050", marginVertical: "4%", alignItems: 'center', fontSize: 14, textAlign: 'center' }}>Informe o seu email de cadastro para iniciar a recuperação de dados.</Text>
              <Input
                placeholder="Email"
                variant="outline"
                autoCapitalize='none'
                keyboardType='email-address'
                onChangeText={(text) => setEmail(text)}
                backgroundColor={'#F2F2F2'}
                style={{ fontSize: 14 }}
                width={"90%"}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
              <TouchableOpacity
                onPress={onClose}
                onPressIn={forgotPassword}
                style={{ backgroundColor: '#C0212E', paddingVertical: 8, borderRadius: 6, marginVertical: "6%", width: "90%", alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: "#FFFFFF", fontWeight: 'bold' }}>Enviar</Text>
              </TouchableOpacity>
            </Actionsheet.Content>
          </Actionsheet>

          <View style={styles.boxGlobal}>

            <View style={styles.line} />

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
