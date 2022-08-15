import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function Login() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <View style={styles.containerLogo}>
        <Image
          source={require('../../assets/logoAFC.png')}
          style={styles.logo}
          resizeMode= "contain"
        />
        <Text style={styles.Title}>Alencar Futebol Clube</Text>
        <Text style={styles.subTitle}>Um clube formado por amigos!</Text>
      </View>

      <View style={styles.containerLogin}>

        <Text style={styles.loginTitle}>Entrar</Text>
        <TextInput 
          placeholder="Usuário ou email"
          style={styles.input}
        />
        
        <TextInput 
          placeholder="Senha"
          style={styles.input}
        />

        <TouchableOpacity style={styles.btnforget}>
          <Text style={styles.forgettext}>Esqueçeu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={ () => navigation.navigate('Home')}
        style={styles.button}>
          <Text style={styles.buttontext}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.Register}>Não tem uma conta? 
          <TouchableOpacity
          onPress={ () => navigation.navigate('Register')}
          style={styles.registerbtn}>
            <Text style={styles.registertext}>Cadastre-se</Text>
          </TouchableOpacity>
        </Text>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F4F4F4'
  },

  containerLogo:{
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo:{
    width: '50%',
    position: 'absolute'
  },

  Title:{
    paddingTop: '60%',
    color: '#8C1F28',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 20,
    fontWeight: '700'
  },

  subTitle:{
    color: '#000000',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 15,
    fontWeight: '400'
  },

  containerLogin:{
    flex: 2,
    paddingHorizontal: '5%'
  },

  loginTitle:{
    color: '#8C1F28',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 25,
    fontWeight: '700'
  },

  input:{
    borderBottomColor: '#8C1F28',
    borderBottomWidth: 2,
    paddingTop: 10
  },

  btnforget:{
    alignItems: 'flex-end',
    paddingTop: '5%',
  },

  forgettext:{
    borderBottomColor: '#8C1F28',
    borderBottomWidth: 1,
  },

  button:{
    backgroundColor: '#8C1F28',
    borderRadius: 40,
    alignItems: 'center',
    paddingVertical: 11,
    marginTop: 24,
    width: '100%'
  },

  buttontext:{
    fontFamily: 'Roboto',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '700',
    color: '#F5F5F5'
  },

  Register: {
    marginTop: 80,
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 12,
    fontWeight: '400'
  },

  registerbtn:{
    paddingLeft:5
  },

  registertext:{
    color: '#8C1F28',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 12,
    fontWeight: '400'
  }

})