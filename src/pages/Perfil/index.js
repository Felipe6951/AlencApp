import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
import { useState } from 'react';

export default function Perfil() {

  const app = initializeApp(firebaseConfig);    
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  const q = query(collection(firestore, "membros"), where ("email", "==", auth.currentUser.email));

  const [usuario, setUser] = useState([])

  onSnapshot(q, (querySnapshot) => {
    const members = [];
    querySnapshot.forEach((doc) => {
      members.push(doc.data().name);
      members.push(doc.data().tampa);
      members.push(doc.data().camisa);
      members.push(doc.data().telefone);
      members.push(doc.data().usuario);
      members.push(doc.data().email);
    })

    setUser(members);
  });

  return (
    <SafeAreaView style={{ backgroundColor: '#F1F1F1' }}>
      <ScrollView>
        <View>
          <View style={{ alignSelf: 'center', marginTop: 8, marginBottom: 16 }}>
            <Image
              source={require('../../assets/img/user.png')}
              style={{ width: 140, height: 160 }}
              resizeMode="contain"
            />
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', color: '#505050', fontSize: 18 }}>{usuario[4]}</Text>
              <Text style={{ color: '#858585', fontSize: 15 }}>Organizador</Text>
            </View>
          </View>

          <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: 288, alignSelf: 'center' }} />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 74, marginVertical: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#C0212E', fontWeight: '600' }}>{usuario[2]}</Text>
              <Text style={{ fontSize: 12 }}>CAMISA</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#C0212E', fontWeight: '600' }}>{usuario[1]}</Text>
              <Text style={{ fontSize: 12 }}>TAMPA</Text>
            </View>
          </View>
        </View>

        <View style={{ backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 2, shadowColor: '#000000', marginTop: 8, paddingBottom: 16}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="soccer-ball-o" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Status</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>ATIVO</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="user-circle" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Nome</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>{usuario[0]}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="user" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Usuário</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>{usuario[4]}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialIcons name="email" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Email</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>{usuario[5]}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="phone" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Telefone</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>{usuario[3]}</Text>
            </View>
          </View>


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row' }}>
              <FontAwesome name="refresh" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Frequência</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>80%</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 24, marginVertical: 16 }}>
            <View style={{ flexDirection: 'row' }}>
              <Ionicons name="today" size={18} color="#C0212E" style={{ marginRight: 4 }} />
              <Text>Dias</Text>
            </View>
            <View>
              <Text style={{ color: '#505050', fontSize: 12 }}>Seg, Qua</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F2F2F2'
  }
});