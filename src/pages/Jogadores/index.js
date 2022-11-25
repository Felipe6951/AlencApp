import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Alert, Animated, Dimensions } from 'react-native';
import { Input } from 'native-base';
import { Ionicons, AntDesign, FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'
import { Swipeable } from 'react-native-gesture-handler';
// import styles from '../Solicitacoes/styles';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where, updateDoc, doc, queryEqual, orderBy } from 'firebase/firestore'

export default function Jogadores() {

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const q = query(collection(firestore, "membros"), where("situacao", "==", "Aceito"));
  const h = query(collection(firestore, "historic"), orderBy("name"))

  const [DATA, setData] = useState([]);
  const [historic, setHistoric] = useState([]);
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
      const unsubcribe = onSnapshot(h, (querrySnapshot) => {
        const HISTORICO = [];
        querrySnapshot.forEach((doc) => {
          HISTORICO.push({ ...doc.data(), id: doc.id});
        })
        setHistoric(HISTORICO);
      });

      return () => {
        unsubcribe();
      }
    }, [])
  );

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

  function LeftActions(name, day) {
    return (
      <View>
        <TouchableOpacity onPress={() => historico(name, day)} style={styles.leftActions}>
          <Feather name="calendar" size={20} color="gray" />
          <Text style={styles.actionText}>Histórico</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function RightActions(name) {
    return (
      <View>
        <TouchableOpacity
          style={styles.rightActions}
          onPress={() => {
            Alert.alert(
              "Excluir",
              "Tem certeza que deseja excluir a conta de " + name + "?",
              [
                {
                  text: 'CANCELAR',
                  style: 'cancel'
                },
                {
                  text: 'CONFIRMAR',
                  onPress: () => updateDoc(doc(firestore, "membros", email), { situacao: "Recusado", type: "Recusado" }).then(() => {
                    console.log(name + " excluido.")
                  })
                }
              ]
            )
          }}
        >
          <Feather name="trash-2" size={20} color="white" />
          <Text style={styles.actionTextRemove}>Excluir</Text>
        </TouchableOpacity>
      </View>

    );
  }

  function historico(name, day) {
    const HISTORIC = []
    console.log(historic)
    for (var i = 0; i < historic.length; i++) {
      let nameIsEqual = name.toUpperCase().trim() == historic[i].name.toUpperCase().trim()
      if (nameIsEqual) {
        HISTORIC.push(historic[i].day);
      }
    }
    return Alert.alert(
      "Histórico de presença",
      name + " (" + day + ")\n\n" + HISTORIC.join("\n"),
      [
        {
          text: 'FECHAR',
          style: 'cancel'
        }
      ]

    );
  }


  const Item = ({ name, tampa, camisa, day }) => (
    <Swipeable
      renderLeftActions={() => LeftActions(name, day)}
      renderRightActions={() => RightActions(name)}
    >
      <View style={styles.boxItem}>
        <View style={styles.boxItemName}>
          <FontAwesome name="user-circle" size={24} style={styles.itemIcon} />
          <View>
            <Text style={styles.itemClass}>Jogador</Text>
            <Text style={styles.itemName}>{name}</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.boxAlencar}>
          <Text style={styles.tshirt}>Camisa {camisa}</Text>
          <Text style={styles.cover}>Tampa: {tampa}</Text>
        </View>
      </View>
    </Swipeable>
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
        renderItem={({ item }) => <Item name={item.name} tampa={item.tampa} camisa={item.camisa} email={item.email} day={item.day}/>}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  leftActions: {
    elevation: 5,
    shadowColor: '#505050',
    height: 103,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    marginLeft: 24,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingLeft: 32,
    paddingRight: 40,
    marginRight: -24
  },
  rightActions: {
    elevation: 5,
    shadowColor: '#505050',
    height: 103,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ED4654',
    marginRight: 24,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingRight: 40,
    paddingLeft: 48,
    marginLeft: -32
  },
  boxItem: {
    width: '90%',
    alignSelf: 'center',
    height: 104,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#505050',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16
  },
  boxItemName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  itemClass: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  itemName: {
    fontSize: 15,
    color: '#505050'
  },
  itemIcon: {
    marginRight: 8,
    color: "#C0212E"
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 8
  },
  boxAlencar: {
    flexDirection: 'row',
    marginLeft: 4
  },
  tshirt: {
    marginRight: 20,
    color: '#505050'
  },
  cover: {
    color: '#505050'
  },
  direction: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionText: {
    color: 'gray',
    fontSize: 14,
    marginTop: 6
  },
  actionIcon: {
    color: 'gray',
    fontSize: 26
  },
  actionTextRemove: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 6
  }
})