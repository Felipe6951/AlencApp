import React, { useState } from 'react';
import { Dimensions, View, Text, Image, TouchableOpacity, SafeAreaView, Alert, StatusBar, ScrollView } from 'react-native';
import { MaterialIcons, Octicons, MaterialCommunityIcons, FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
const { width } = Dimensions.get("window")

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
import { useEffect } from 'react';

export default function Home() {

  const navigation = useNavigation()

  const app = initializeApp(firebaseConfig);    
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  const q = query(collection(firestore, "membros"), where ("email", "==", auth.currentUser.email));

  const [usuario, setUser] = useState([])

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const members = [];
      querySnapshot.forEach((doc) => {
        members.push(doc.data().usuario);
        members.push(doc.data().tampa);
      })
      
      setUser(members);
    });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={{ backgroundColor: '#FFFFFF', height: 170, paddingHorizontal: 24, paddingVertical: 16, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <TouchableOpacity 
        onPress={() => navigation.navigate('Perfil')}
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Image
              source={require('../../assets/img/user.png')}
              style={{ width: 48, height: 48, marginRight: 8 }}
              resizeMode="contain"
            />
          </View>

          <View style={{ marginRight: 8 }}>
            <Text>Olá,</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{usuario[0]}</Text>
          </View>

          <View>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
          </View>
        </TouchableOpacity>

        <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: 312, alignSelf: 'center' }} />

        <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

          <View style={{ marginRight: 108, alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Tampa</Text>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Octicons name="feed-star" size={20} color="#D93B48" />
              <Text style={{ fontWeight: 'bold', fontSize: 18, color: "#D93B48", marginLeft: 4 }}>{usuario[1]}</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={{ backgroundColor: '#C0212E', width: 144, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 8 }}
              onPress={() => Alert.alert('Check!')}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FFFFFF', marginRight: 8 }}>Check-in</Text>
              <MaterialCommunityIcons name="qrcode-scan" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ marginVertical: 24 }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          snapToAlignment='start'
          style={{ width: width, height: width / 2.6 }}
        >

          <TouchableOpacity
            onPress={() => navigation.navigate('Perfil')}
            style={{ marginHorizontal: 8, backgroundColor: '#C83844', width: width * 0.4, height: width / 4, borderRadius: 8, justifyContent: 'center', paddingLeft: 16 }}
          >
            <FontAwesome name="user-circle" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Presenças')}
            style={{ marginHorizontal: 8, backgroundColor: '#C83844', width: width * 0.4, height: width / 4, borderRadius: 8, justifyContent: 'center', paddingLeft: 16 }}
          >
            <AntDesign name="checkcircle" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Presenças</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Estatuto')}
            style={{ marginHorizontal: 8, backgroundColor: '#C83844', width: width * 0.4, height: width / 4, borderRadius: 8, justifyContent: 'center', paddingLeft: 16 }}
          >
            <Entypo name="book" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Estatuto</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Sobre')}
            style={{ marginHorizontal: 8, backgroundColor: '#C83844', width: width * 0.4, height: width / 4, borderRadius: 8, justifyContent: 'center', paddingLeft: 16 }}
          >
            <AntDesign name="questioncircle" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Sobre</Text>
          </TouchableOpacity>


        </ScrollView>
      </View>
    </SafeAreaView >
  );
}

