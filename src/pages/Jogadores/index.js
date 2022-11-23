import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Alert, Animated, ScrollView } from 'react-native';
import { Input } from 'native-base';
import { Ionicons, AntDesign, FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'
import { Swipeable } from 'react-native-gesture-handler';
import { Paragraph, Dialog, Portal, Provider } from 'react-native-paper';
import styles from '../Solicitacoes/styles';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where, updateDoc, doc } from 'firebase/firestore'

export default function Jogadores() {

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const q = query(collection(firestore, "membros"), where("situacao", "==", "Aceito"));

  const [DATA, setData] = useState([]);
  
  const historic = [{
      name: "Francisca Jilkelly Costa Ferreira",
      data: "29 / 7 / 2022"
    },
    {
      name: "Francisca Jilkelly Costa Ferreira",
      data: "21 / 7 / 2022"
    },
    {
      name: "Francisca Jilkelly Costa Ferreira",
      data: "22 / 7 / 2022"
    },
    {
      name: "Marcos",
      data: "23 / 7 / 2022"
    },
    {
      name: "Marcos",
      data: "24 / 7 / 2022"
    },
    {
      name: "Kaio Eduardo Alves de Lima",
      data: "25 / 7 / 2022"
    },
    {
      name: "Kaio Eduardo Alves de Lima",
      data: "26 / 7 / 2022"
    },
    {
      name: "Kaio Eduardo Alves de Lima",
      data: "27 / 7 / 2022"
    },
    {
      name: "Maikon",
      data: "28 / 7 / 2022"
    },
    {
      name: "Felipe Freitas Lopes",
      data: "30 / 7 / 2022"
    },
    {
      name: "Felipe Freitas Lopes",
      data: "18 / 7 / 2022"
    },
    {
      name: "Felipe Freitas Lopes",
      data: "29 / 9 / 2022"
    }
  ]

  var nome = "Felipe Freitas Lopes"

  function historico(name) {
    
    const HISTORIC = []
    
    for (var i = 0; i < historic.length; i++) {
      if (historic[i].name == nome) {
        HISTORIC.push(historic[i].data)
      }
    }
  
    return Alert.alert("Histórico de presença", HISTORIC.join("\n"))
  }

  const [searchText, setSearchText] = useState('')
  const [list, setList] = useState([])

  useEffect(() => {
    if (searchText === '') {
      setList(DATA);
    } else {
      setList(
        DATA.filter(item => (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || item.camisa.indexOf(searchText) > -1 || item.tampa.indexOf(searchText) > -1))
      );
    }
  }, [searchText]);

  useFocusEffect(
    React.useCallback(() => {

      const unsubcribe = onSnapshot(q, (querySnapshot) => {
        const members = [];
        querySnapshot.forEach((doc) => {
          members.push({ ...doc.data(), id: doc.id });
        })
        setData(members);
        setList(members);
        console.log("entrou");
      });

      return () => {
        unsubcribe();
      };

    }, [])
  );

  const Item = ({ name, tampa, camisa, email }) => (

    <View style={styles.itemCard}>
      <View style={styles.itemContent}>
        <FontAwesome name="user-circle" size={24} style={styles.itemIcon} />
        <View style={{ marginLeft: 4 }}>
          <Text style={styles.itemName}>{name}</Text>
        </View>

      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: 288, alignSelf: 'center', marginBottom: 8 }} />
      <View style={{ flexDirection: 'row', marginLeft: 4 }}>
        <Text style={{ marginRight: 20, color: '#505050' }}>Camisa: {camisa}</Text>
        <Text style={{ color: '#505050' }}>Tampa: {tampa}</Text>
      </View>
      
      <View style={[styles.direction, styles.buttonChoosesPosition]}>
        <TouchableOpacity style={styles.buttonChooses}
          onPress={() => historico(name)}>
          <Text style={styles.textButtonChooses}>Histórico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonChooses}
          onPress={() => updateDoc(doc(firestore, "membros", email), { situacao: "Recusado", type: "Recusado" }).then(() => {
            Alert.alert("Jogadores", name + "exluido")
          })}>
          <Text style={styles.textButtonChooses}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>  
  );


  return (
    <SafeAreaView style={{ backgroundColor: '#FAFAFA', height: '100%' }}>
      <FlatList
        ListHeaderComponent={
          <View style={{ marginVertical: 24 }}>
            <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: '5%', borderTopLeftRadius: 8, borderTopRightRadius: 8, paddingHorizontal: 16, flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="filter" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Lista</Text>
              </View>

              <View style={{ backgroundColor: '#FFFFFF', borderRadius: 50, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                <Text>{DATA.length}</Text>
              </View>
            </View>

            <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: '5%', paddingHorizontal: 16, alignItems: 'center', paddingVertical: 12 }}>
              <Text style={{ color: '#505050', fontSize: 12, marginBottom: 16 }}>Busque os jogadores pelo nome, tampa, ou número da camisa.</Text>
              <Input
                placeholder="Buscar..."
                fontSize={15}
                variant="outline"
                value={searchText}
                backgroundColor={'#F2F2F2'}
                placeholderTextColor={'#888888'}
                height={10}
                onChangeText={(t) => setSearchText(t)}
                InputLeftElement={
                  <AntDesign name="search1" size={18} color="#585858" style={{ marginLeft: 8 }} />
                }
                InputRightElement={
                  <TouchableOpacity onPress={() => setSearchText('')}>
                    <MaterialIcons name="highlight-remove" size={20} color="#585858" style={{ marginRight: 8 }} />
                  </TouchableOpacity>
                }
              />
            </View>
          </View>
        }
        data={list}
        renderItem={({ item }) => <Item name={item.name} tampa={item.tampa} camisa={item.camisa} email={item.email} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
