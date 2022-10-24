import React from 'react';
import { Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import styles from './styles';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Perfil() {

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  const q = query(collection(firestore, "membros"), where("email", "==", auth.currentUser.email));

  const [usuario, setUser] = useState([])

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const members = [];
      querySnapshot.forEach((doc) => {
        members.push(doc.data().name);
        members.push(doc.data().tampa);
        members.push(doc.data().camisa);
        members.push(doc.data().telefone);
        members.push(doc.data().user);
        members.push(doc.data().email);
        members.push(doc.data().type);
        members.push(doc.data().status);

      })

      setUser(members);
    });
  }, [])

  return (
    <SafeAreaView style={styles.back}>
      <ScrollView>

        <View style={styles.boxPrincipal}>
          <Image style={styles.userPhoto} source={require('../../assets/img/userBig.png')} resizeMode="contain" />
          <View style={styles.boxPrincipalNames}>
            <Text style={styles.nameTitle}>{usuario[4]}</Text>
            <Text style={styles.organizerTitle}>{usuario[6]}</Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.boxAlencar}>
          <View style={styles.subBoxAlencar}>
            <Text style={styles.alencarNumber}>{usuario[2]}</Text>
            <Text style={styles.alencarText}>CAMISA</Text>
          </View>
          <View style={styles.subBoxAlencar}>
            <Text style={styles.alencarNumber}>{usuario[1]}</Text>
            <Text style={styles.alencarText}>TAMPA</Text>
          </View>
        </View>

        <View style={styles.boxInformations}>
          <View style={styles.boxSole}>
            <View style={styles.boxSoleDirection}>
              <FontAwesome name="soccer-ball-o" size={18} style={styles.icons} />
              <Text>Status</Text>
            </View>
            <View>
              <Text style={styles.informations}>{usuario[7]}</Text>
            </View>
          </View>


          <View style={styles.boxSole}>
            <View style={styles.boxSoleDirection}>
              <FontAwesome name="user-circle" size={18} style={styles.icons} />
              <Text>Nome</Text>
            </View>
            <View>
              <Text style={styles.informations}>{usuario[0]}</Text>
            </View>
          </View>

          <View style={styles.boxSole}>
            <View style={styles.boxSoleDirection}>
              <FontAwesome name="user" size={18} style={styles.icons} />
              <Text>Usuário</Text>
            </View>
            <View>
              <Text style={styles.informations}>{usuario[4]}</Text>
            </View>
          </View>

          <View style={styles.boxSole}>
            <View style={styles.boxSoleDirection}>
              <MaterialIcons name="email" size={18} style={styles.icons} />
              <Text>Email</Text>
            </View>
            <View>
              <Text style={styles.informations}>{usuario[5]}</Text>
            </View>
          </View>

          <View style={styles.boxSole}>
            <View style={styles.boxSoleDirection}>
              <FontAwesome name="phone" size={18} style={styles.icons} />
              <Text>Telefone</Text>
            </View>
            <View>
              <Text style={styles.informations}>{usuario[3]}</Text>
            </View>
          </View>


          <View style={styles.boxSole}>
            <View style={styles.boxSoleDirection}>
              <FontAwesome name="refresh" size={18} style={styles.icons} />
              <Text>Frequência</Text>
            </View>
            <View>
              <Text style={styles.informations}>80%</Text>
            </View>
          </View>

          <View style={styles.boxSole}>
            <View style={styles.boxSoleDirection}>
              <Ionicons name="today" size={18} style={styles.icons} />
              <Text>Dias</Text>
            </View>
            <View>
              <Text style={styles.informations}>Seg, Qua</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

