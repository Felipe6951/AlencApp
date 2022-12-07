import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons, Octicons, MaterialCommunityIcons, FontAwesome, AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';

export default function Home() {

  const navigation = useNavigation()

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  const q = query(collection(firestore, "membros"), where("email", "==", auth.currentUser.email));

  const [usuario, setUser] = useState([])

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => {
      const members = [];
      querySnapshot.forEach((doc) => {
        members.push(doc.data().user);
        members.push(doc.data().tampa);
      })

      setUser(members);
    });
  }, []);

  TouchableOpacity.defaultProps = { activeOpacity: 0.9 };
  const { width } = Dimensions.get("window");

  return (
    <SafeAreaView style={{ backgroundColor: '#FAFAFA', height: '100%'}}>
      <StatusBar />
      <View style={{ backgroundColor: '#FFFFFF', height: "30%", paddingHorizontal: 24, paddingVertical: 24, elevation: 5, shadowColor: "#909090", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Perfil')}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <Image
              source={require('../../assets/img/userBig.png')}
              style={{ width: 50, marginRight: 8 }}
              resizeMode="contain"
            />
          </View>

          <View>
            <Text>Olá,</Text>
            <Text style={{ fontWeight: '600', fontSize: 18 }}>{usuario[0]}</Text>
          </View>

          <View>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
          </View>
        </TouchableOpacity>

        <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: '100%', alignSelf: 'center', marginBottom: 8}} />

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
              onPress={() => navigation.navigate('Scanner')}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FFFFFF', marginRight: 8 }}>Check-in</Text>
              <MaterialCommunityIcons name="qrcode-scan" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment='start'
        style={{ width: width, height: '20%', paddingHorizontal: 16, marginTop: 24, paddingVertical: 8 }}
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
          style={{ marginLeft: 8, marginRight: 32, backgroundColor: '#C83844', width: width * 0.4, height: width / 4, borderRadius: 8, justifyContent: 'center', paddingHorizontal: 16 }}
        >
          <AntDesign name="questioncircle" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Sobre</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView >
  );
}

