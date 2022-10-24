import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where, doc, updateDoc, deleteDoc, deleteField } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


export default function Solicitacoes() {

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app)

  const q = query(collection(firestore, "membros"), where("situacao", "==", "Pendente"));

  const [DATA, setData] = useState([]);

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const members = [];
      querySnapshot.forEach((doc) => {
        members.push({ ...doc.data(), id: doc.id });
      })

      setData(members);
    });
  }, [])

  const Item = ({ name, email, password }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemContent}>
        <FontAwesome name="user-circle" size={24} style={styles.itemIcon} />
        <View>
          <Text style={styles.itemName}>{name}</Text>
          <Text style={styles.itemEmail}>{email}</Text>
        </View>
      </View>

      <View style={styles.line}/>

     
      <View style={[styles.direction, styles.buttonChoosesPosition]}>
        <TouchableOpacity style={styles.buttonChooses}
          onPress={() => deleteDoc(doc(firestore, "membros", name)).then(() => {
            Alert.alert("Solicitações", name + " recusado!")
          })}>
          <Text style={styles.textButtonChooses}>Recusar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonChooses}
          onPress={() => updateDoc(doc(firestore, "membros", name), { situacao: "Aceito", type: "Jogador", password: deleteField() }) && createUserWithEmailAndPassword(auth, email, password).then(() => {
            Alert.alert("Solicitações", name + " aceito!")
          })}>
          <Text style={styles.textButtonChooses}>Aceitar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const CardHeader = () => (
    <View style={styles.cardForItems}>
      <View style={styles.cardRed}>
        <View style={styles.direction}>
          <MaterialIcons name="new-releases" size={20} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Novos cadastros</Text>
        </View>

        <View style={styles.counter}>
          <Text>{DATA.length}</Text>
        </View>
      </View>

      <View style={styles.descriptionContent}>
        <Text style={styles.cardDescription}>Solicitações de cadastro no Alencar Futebol Clube</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.back}>
      <FlatList
        ListHeaderComponent={
          <CardHeader />
        }
        data={DATA}
        renderItem={({ item }) => <Item name={item.name} email={item.email} password={item.password} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

