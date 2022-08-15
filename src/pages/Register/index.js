import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Select, Input, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from "@expo/vector-icons";

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
      </View>

      <View style={styles.containerRegister}>
        <TextInput 
          InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="muted.400" />}
          placeholder="Nome completo"
          style={styles.input}
        />
        
        <Input InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} ml="2" 
    color="muted.400" />} placeholder="Name" style={styles.input}/>
        
        <TextInput 
          placeholder="Email"
          style={styles.input}
        />
        <TextInput 
          placeholder="Telefone"
          style={styles.input}
        />
        <TextInput 
          placeholder="Camisa"
          style={styles.input}
        />
        
        <Select selectedValue='tampa'
        placeholder='Tampa'
        style={styles.input}>
          <Select.Item label="1"/>
          <Select.Item label="2"/>
          <Select.Item label="3"/>
          <Select.Item label="4"/>
          <Select.Item label="5"/>
          <Select.Item label="6"/>
        </Select>
        
        <Input type="password" 
          placeholder="Senha"
          style={styles.input}
        />
        <Input type="password"
          placeholder="Confirmar senha"
          style={styles.input}
        />

        <TouchableOpacity 
        onPress={ () => navigation.navigate('Login')}
        style={styles.button}>
          <Text style={styles.buttontext}>Cadastrar</Text>
        </TouchableOpacity>

        <Text style={styles.Login}>Já tem uma conta? 
          <TouchableOpacity
          onPress={ () => navigation.navigate('Login')}
          style={styles.loginbtn}>
            <Text style={styles.logintext}>Faça login</Text>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  logo:{
    width: '30%',
    position: 'absolute'
  },

  Title:{
    paddingTop: '40%',
    color: '#8C1F28',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 20,
    fontWeight: '700'
  },

  containerRegister:{
    flex: 2,
    paddingHorizontal: '5%'
  },

  input:{
    borderBottomColor: '#8C1F28',
    borderBottomWidth: 2,
    paddingTop: 15
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

  Login: {
    marginTop: 46,
    alignSelf: 'center',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 12,
    fontWeight: '400'
  },

  loginbtn:{
    paddingLeft:5
  },

  logintext:{
    color: '#8C1F28',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontSize: 12,
    fontWeight: '400'
  }
})