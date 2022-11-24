import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Input, FormControl, Select, CheckIcon } from 'native-base';

import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp, setDoc, doc, collection } from 'firebase/firestore';
import { firebaseConfig } from '../../../firebase-config';

export default function Avisos() {
  const [motive] = React.useState(["Jogo cancelado", "Mudança de horário", "Outro"])
  const [motiveSelected, setMotiveSelected] = React.useState([])
  const [description, setDescription] = useState('');

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  function created() {
    var day = new Date().getDate();
    var month = (new Date().getMonth() + 1);
    var year = new Date().getFullYear();
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();

    if (minutes >= 0 && minutes < 10) {
      minutes = "0" + minutes;
    }

    if (hour >= 0 && hour < 10) {
      hour = "0" + hour;
    }

    var date = (hour + ":" + minutes + " - " + day + "/" + month + "/" + year);

    return date;
  }

  const createWarnig = () => {
    console.log(motiveSelected)
    if (motiveSelected === '' || description === '') {
      Alert.alert('ERROR', 'Preencha todos os campos.')
    } else {
      setDoc(doc(firestore, "notificacoes", serverTimestamp()), {
        motive: motiveSelected,
        description: description,
        created: created(),
        stamp: serverTimestamp()
      })
        .then(() => {
          Alert.alert("Avisos", "Aviso enviado!", [{text: 'FECHAR'}]);
          setMotiveSelected([]);
          setDescription('');
        })
        .catch((error) => {
          Alert.alert(error)
        })
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#FAFAFA', paddingBottom: "100%" }}>
      <View>
        <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: '5%', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="alert-circle" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
            <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Novo aviso</Text>
          </View>
        </View>

        <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: '5%', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 }}>
          <View>
            <FormControl.Label>Motivo</FormControl.Label>
            <Select
              selectedValue={motiveSelected}
              accessibilityLabel="Selecione o motivo"
              placeholder="Selecione o motivo"
              _selectedItem={{
                bg: "red.100",
                endIcon: <CheckIcon size="5" color="#C0212E" />,
              }}
              backgroundColor={'#F2F2F2'}
              placeholderTextColor={'#888888'}
              fontSize={15}
              onValueChange={(itemValue) =>
                setMotiveSelected(itemValue)
              }>
              {
                motive.map(cr => {
                  return <Select.Item label={cr} value={cr} />
                })
              }
            </Select>
          </View>

          <View style={{ marginBottom: 8 }}>
            <FormControl.Label>Descrição</FormControl.Label>
            <Input
              placeholder="Descreva o aviso..."
              fontSize={15}
              variant="outline"
              backgroundColor={'#F2F2F2'}
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholderTextColor={'#888888'}
              multiline={true}
              height={20}
              textAlignVertical={'top'}
            />
          </View>

          <View style={{ justifyContent: 'flex-end', marginRight: 8, marginTop: 16, flexDirection: 'row', marginBottom: 8 }}>
            <TouchableOpacity
              style={{ paddingTop: 8 }}
              onPress={() => {
                setDescription('')
                setMotiveSelected([])
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#C0212E', marginRight: 24 }}>LIMPAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ paddingHorizontal: 8, paddingTop: 8 }}
              onPress={() => {
                Keyboard.dismiss();
                createWarnig();
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#C0212E' }}>ENVIAR</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}

const card = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
})