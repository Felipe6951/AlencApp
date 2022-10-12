import React, { useRef, useState } from 'react';
import { View, Dimensions, StyleSheet, Image, SafeAreaView, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Input, StatusBar, FormControl, Select, CheckIcon } from 'native-base';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';

import { getFirestore, setDoc, doc, getDocs, collection, query, onSnapshot, addDoc } from 'firebase/firestore'
import { color, max } from 'react-native-reanimated';

export default function Register() {
  const navigation = useNavigation();

  const [tampa] = React.useState(['1', '2', '3', '4', '5', '6'])
  const [tampaSelected, setTampaSelected] = React.useState([])

  const [service, setService] = React.useState("");

  const usarnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const shirtNumberRef = useRef();

  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [shirtnum, setShirtnum] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const handleCreateAccount = () => {
    setDoc(doc(firestore, "membros", name), {
      name: name,
      user: username,
      email: email,
      telefone: phone,
      camisa: shirtnum,
      tampa: tampaSelected,
      situacao: "Pendente",
      type: "membro",
      status: "Ativo",
      password: password
    })
      .then(() => {
        Alert.alert("Registro", "Conta Enviada para análise da comição")
      })
      .catch(error => {
        console.log(error)
        Alert.alert(error.message)
      })
  }

  const { width } = Dimensions.get("screen")

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignSelf: 'center', marginTop: 50, marginBottom: 24 }}>
          <Image
            source={require('../../assets/img/logo_afc.png')}
            style={{ width: 140, height: 160 }}
            resizeMode="contain"
          />
        </View>

        <View style={{marginHorizontal: 24}}>
          <View style={{ marginBottom: 8 }}>
            <FormControl.Label>Nome completo</FormControl.Label>
            <Input
              placeholder="Seu nome completo"
              onChangeText={(text) => setName(text)}
              fontSize={15}
              variant="outline"
              backgroundColor={'#F2F2F2'}
              placeholderTextColor={'#888888'}
            />
          </View>

          <View style={{ marginBottom: 8 }}>
            <FormControl.Label>Nome de usuário</FormControl.Label>
            <Input
              placeholder="Seu nome de usuário"
              onChangeText={(text) => setUsername(text)}
              fontSize={15}
              variant="outline"
              autoCapitalize='none'
              backgroundColor={'#F2F2F2'}
              placeholderTextColor={'#888888'}
            />
          </View>

          <View style={{ marginBottom: 8 }}>
            <FormControl.Label>Endereço de email</FormControl.Label>
            <Input
              placeholder="Seu email"
              onChangeText={(text) => setEmail(text)}
              fontSize={15}
              variant="outline"
              autoCapitalize='none'
              keyboardType='email-address'
              backgroundColor={'#F2F2F2'}
              placeholderTextColor={'#888888'}
            />
          </View>

          <View style={{ marginBottom: 8 }}>
            <FormControl.Label>Telefone</FormControl.Label>
            <Input
              placeholder="Seu telefone"
              onChangeText={(text) => setPhone(text)}
              fontSize={15}
              variant="outline"
              keyboardType='phone-pad'
              backgroundColor={'#F2F2F2'}
              placeholderTextColor={'#888888'}
            />
          </View>

          <View style={{ marginBottom: 8 }}>
            <FormControl.Label>Número da camisa</FormControl.Label>
            <Input
              placeholder="O número de sua camisa"
              onChangeText={(text) => setShirtnum(text)}
              fontSize={15}
              variant="outline"
              keyboardType='numeric'
              backgroundColor={'#F2F2F2'}
              placeholderTextColor={'#888888'}
            />
          </View>

          <View style={{ marginBottom: 8 }}>
            <FormControl.Label>Tampa</FormControl.Label>
            <Select
              selectedValue={tampaSelected}
              accessibilityLabel="Escolha sua tampa"
              placeholder="Escolha a sua tampa"
              _selectedItem={{
                bg: "#C0212E",
                endIcon: <CheckIcon size="5" color="#FFFFFF" />,
              }}
              backgroundColor={'#F2F2F2'}
              placeholderTextColor={'#888888'}
              fontSize={15}
              onValueChange={(itemValue) =>
                setTampaSelected(itemValue)
              }>
              {
                tampa.map(cr => {
                  return <Select.Item label={cr} value={cr} />
                })
              }
            </Select>
          </View>

          <View style={{ marginBottom: 8 }}>
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

          <View style={{ marginBottom: 8 }}>
            <FormControl.Label>Confirmar senha</FormControl.Label>
            <Input
              placeholder="Sua senha novamente"
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
              onPress={handleCreateAccount}>
              <AntDesign name="check" size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Cadastrar</Text>
            </TouchableOpacity>


            <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: width / 1.3, alignSelf: 'center', marginTop: 40 }} />

            <View style={{ flexDirection: 'row', marginTop: 16, justifyContent: 'center', marginVertical: 24 }}>
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
