import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, SafeAreaView, TouchableOpacity, Text, Alert, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Input, FormControl, StatusBar } from 'native-base';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence, browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';

const { width } = Dimensions.get('window')

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
    <SafeAreaView style={position.container}>
      <StatusBar />
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={position.logo}>
            <Image
              source={require('../../assets/img/logo_afc.png')}
              resizeMode="contain"
              style={image.logo}
            />
          </View>

          <View style={{ marginBottom: 8 }}>
            <FormControl.Label>Email ou usuário</FormControl.Label>
            <Input
              placeholder="Seu email ou usuário"
              variant="outline"
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={(text) => setEmail(text)}
              backgroundColor={'#F2F2F2'}
              style={form.all}
            />
          </View>

          <View>
            <FormControl.Label>Senha</FormControl.Label>
            <Input
              placeholder="Sua senha"
              onChangeText={(text) => setPassword(text)}
              variant="outline"
              autoCapitalize='none'
              secureTextEntry={hidePassword}
              InputRightElement={
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                  style={form.buttonEye}
                >
                  {hidePassword ?
                    <Ionicons name='eye' style={form.iconEye} />
                    :
                    <Ionicons name='eye-off' style={form.iconEye} />
                  }
                </TouchableOpacity>
              }
              backgroundColor={'#F2F2F2'}
              style={form.all}
            />
          </View>

          <View style={position.enter}>
            <TouchableOpacity
              style={form.buttonEnter}
              onPress={handleSignin}
            >
              <AntDesign name="login" size={18} style={form.iconButtonEnter} />
              <Text style={typography.buttonEnter}>Entrar</Text>
            </TouchableOpacity>
          </View>

          <View style={position.recoverPass}>
            <Text style={typography.questions}>Esqueceu seus dados de login?</Text>
            <TouchableOpacity onPress={forgotPassword}>
              <Text style={typography.actions}>Recuperar acesso</Text>
            </TouchableOpacity>
          </View>

          <View style={position.register}>
            <View style={styles.line} />
            <View style={position.registerContent}>
              <Text style={typography.questions}>Não tem uma conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={typography.actions}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView >
  );
}

const position = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24
  },
  logo: {
    alignSelf: 'center',
    marginTop: 58,
    marginBottom: 32
  },
  enter: {
    marginTop: 24
  },
  recoverPass: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'center'
  },
  register: {
    marginTop: 116,
    marginBottom: 24
  },
  registerContent: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center'
  }
})

const image = StyleSheet.create({
  logo: {
    width: 180,
    height: 200
  }
})

const form = StyleSheet.create({
  all: {
    fontSize: 15,
    placeholderTextColor: '#888888',
    paddingLeft: 12
  },
  buttonEye: {
    marginRight: 12
  },
  iconEye: {
    color: '#505050',
    fontSize: 25
  },
  iconButtonEnter: {
    color: '#FFFFFF',
    marginRight: 4
  },
  buttonEnter: {
    backgroundColor: '#C0212E',
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})

const typography = StyleSheet.create({
  buttonEnter: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FFFFFF'
  },
  questions: {
    color: '#505050',
    fontSize: 12,
    marginRight: 4
  },
  actions: {
    color: '#505050',
    fontSize: 12,
    fontWeight: 'bold'
  }
})

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    width: width * 0.7,
    alignSelf: 'center'
  }
})