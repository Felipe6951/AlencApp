import React, { useRef, useState } from 'react';
import { View, StyleSheet, Image, SafeAreaView, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Input } from 'native-base';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function Register() {
  const navigation = useNavigation();

  const [bestFoot] = useState(['Melhor pé', 'Direito', 'Esquerdo', 'Ambidestro'])
  const [footSelected, setFootSelected] = useState([])

  const [tampa] = useState(['Tampa', '1', '2', '3', '4', '5', '6'])
  const [tampaSelected, setTampaSelected] = useState([])

  const usarnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const shirtNumberRef = useRef();
  const passwordConfirmRef = useRef();

  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView>

        <View style={{ alignSelf: 'center', marginTop: 90, marginBottom: 40 }}>
          <Image
            source={require('../../assets/img/logo_afc.png')}
            style={{ width: 140, height: 160 }}
            resizeMode="contain"
          />
        </View>

        <View style={{ marginHorizontal: 24 }}>
          <KeyboardAvoidingView behavior="padding">

            <View style={{ marginBottom: 16 }}>
              <Input
                returnKeyType="next"
                onSubmitEditing={() => usarnameRef.current.focus()}
                variant="filled"
                placeholder="Nome completo"
                fontSize={15}
                style={{ backgroundColor: '#F2F2F2' }}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Input
                ref={usarnameRef}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
                variant="filled"
                placeholder="Nome de usuário"
                fontSize={15}
                style={{ backgroundColor: '#F2F2F2' }}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Input
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={() => phoneRef.current.focus()}
                variant="filled"
                placeholder="Endereço de email"
                fontSize={15}
                style={{ backgroundColor: '#F2F2F2' }}
                autoCapitalize='none'
                keyboardType='email-address'
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Input
                ref={phoneRef}
                returnKeyType="next"
                onSubmitEditing={() => shirtNumberRef.current.focus()}
                variant="filled"
                placeholder="Telefone"
                fontSize={15}
                style={{ backgroundColor: '#F2F2F2' }}
                autoCapitalize='none'
                keyboardType='phone-pad'
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Input
                ref={shirtNumberRef}
                variant="filled"
                placeholder="Número da camisa"
                fontSize={15}
                style={{ backgroundColor: '#F2F2F2' }}
                keyboardType='numeric'
              />
            </View>

            <View style={{ marginBottom: 16, borderRadius: 4, backgroundColor: '#F2F2F2', height: 45, justifyContent: 'center' }}>
              <Picker
                style={{ color: '#9E9E9E' }}
                selectedValue={footSelected}
                onValueChange={(itemValue) =>
                  setFootSelected(itemValue)
                }>
                {
                  bestFoot.map(cr => {
                    return <Picker.Item label={cr} value={cr} />
                  })
                }
              </Picker>
            </View>

            <View style={{ marginBottom: 16, borderRadius: 4, backgroundColor: '#F2F2F2', height: 45, justifyContent: 'center' }}>
              <Picker
                style={{ color: '#9E9E9E' }}
                selectedValue={tampaSelected}
                onValueChange={(itemValue) =>
                  setTampaSelected(itemValue)
                }>
                {
                  tampa.map(cr => {
                    return <Picker.Item label={cr} value={cr} />
                  })
                }
              </Picker>
            </View>

            <View style={{ marginBottom: 16 }}>
              <Input
                returnKeyType="next"
                onSubmitEditing={() => passwordConfirmRef.current.focus()}
                variant="filled"
                placeholder="Senha"
                style={{ backgroundColor: '#F2F2F2', paddingLeft: 12 }}
                onChangeText={(texto) => setPassword(texto)}
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

            <View style={{ marginBottom: 16 }}>
              <Input
                ref={passwordConfirmRef}
                variant="filled"
                placeholder="Senha"
                style={{ backgroundColor: '#F2F2F2', paddingLeft: 12 }}
                onChangeText={(texto) => setPassword(texto)}
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
          </KeyboardAvoidingView>

          <View style={{ marginTop: 8 }}>
            <TouchableOpacity
              style={{ backgroundColor: '#C0212E', width: 312, height: 40, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}
              onPress={() => navigation.navigate('Auxiliar')}>
              <AntDesign name="check" size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Cadastrar</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 40, marginBottom: 24 }}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: 288, alignSelf: 'center' }} />

            <View style={{ flexDirection: 'row', marginTop: 16, justifyContent: 'center' }}>
              <Text style={{ color: '#505050', fontSize: 12, marginRight: 4 }}>Já tem uma conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={{ color: '#505050', fontSize: 12, fontWeight: 'bold' }}>Faça login</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}