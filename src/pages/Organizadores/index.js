import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { Input } from 'native-base';
import { Ionicons, AntDesign, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where } from 'firebase/firestore'

export default function Organizadores() {

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  
  const q = query(collection(firestore, "membros"), where ("type", "==", "Organizador"));
  
  const [DATA, setData] = useState([]);

  class FabOrganizer extends Component {
    animation = new Animated.Value(0)

    toggleOptions = () => {
      const toValue = this.open ? 0 : 1

      Animated.spring(this.animation, {
        toValue,
        friction: 7,
        useNativeDriver: true,
      }).start();

      this.open = !this.open;
    }

    render() {

      const addStyle = {
        transform: [
          { scale: this.animation },
          {
            translateY: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -55]
            })
          }
        ]
      }

      const rotation = {
        transform: [
          {
            rotate: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "135deg"]
            })
          }
        ]
      }

      return (
        <View style={[styles.container, this.props.style]}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('NewOrganizer')}
            accessibilityLabel="eai"
          >

            <Animated.View style={[styles.button, styles.submenu, addStyle]}>
              <Entypo name="plus" size={20} color="#FFFFFF" />
            </Animated.View>
          </TouchableWithoutFeedback>


          <TouchableWithoutFeedback onPress={this.toggleOptions} >
            <Animated.View style={[styles.button, styles.menu, rotation]}>
              <Entypo name="plus" size={24} color="#FFFFFF" />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }

  const Item = ({ name, tampa, camisa }) => (
    <View style={{ width: 312, alignSelf: 'center', height: 104, backgroundColor: '#FFFFFF', elevation: 5, shadowColor: '#505050', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 8, marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <FontAwesome name="user-circle" size={24} color="#C0212E" style={{ marginRight: 4 }} />
        <View style={{ marginLeft: 4 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Organizador</Text>
          <Text style={{ fontSize: 15, color: '#505050' }}>{name}</Text>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: 288, alignSelf: 'center', marginBottom: 8 }} />
      <View style={{ flexDirection: 'row', marginLeft: 4 }}>
        <Text style={{ marginRight: 20, color: '#505050' }}>Camisa {camisa}</Text>
        <Text style={{ color: '#505050' }}>Tampa: {tampa}</Text>
      </View>
    </View>
  );

  const InputSearch = () => (
    <Input
      placeholder="Buscar..."
      fontSize={15}
      variant="outline"
      backgroundColor={'#F2F2F2'}
      placeholderTextColor={'#888888'}
      height={10}
      value={searchOrganizer}
      onChangeText={(t) => setSearchOrganizer(t)}
      InputLeftElement={
        <AntDesign name="search1" size={18} color="#585858" style={{ marginLeft: 8 }} />
      }
      InputRightElement={
        <TouchableOpacity
          onPress={() => setSearchOrganizer('')}
        >
          <MaterialIcons name="highlight-remove" size={20} color="#585858" style={{ marginRight: 8 }} />
        </TouchableOpacity>
      }
    />
  );

  const CardHeader = () => (
    <View style={{ marginBottom: 24 }}>
      <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 24, borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name="filter" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Lista</Text>
        </View>

        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 50, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
          <Text>{DATA.length}</Text>
        </View>
      </View>

      <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: 24, paddingHorizontal: 16, alignItems: 'center', paddingVertical: 12 }}>
        <Text style={{ color: '#505050', fontSize: 12, marginBottom: 16 }}>Busque os organizadores pelo nome, tampa, ou número da camisa.</Text>
        <InputSearch />
      </View>
    </View>
  );

  const [searchOrganizer, setSearchOrganizer] = useState('');
  const [list, setList] = useState(DATA);

  useEffect(() => {
    
    onSnapshot(q, (querySnapshot) => {
      const members = [];
      querySnapshot.forEach((doc) => {
        members.push({ ...doc.data(), id: doc.id });
      })
      
      setData(members);
    });

    if (searchOrganizer === '') {
      setList(DATA);
    } else {
      setList(
        DATA.filter(item => {
          if (item.name.toLowerCase().indexOf(searchOrganizer.toLowerCase()) > -1) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [searchOrganizer]);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: '#F1F1F1' }}>
      <FlatList
        ListHeaderComponent={
          <View>
            <CardHeader />
          </View>
        }
        data={list}
        renderItem={({ item }) => <Item name={item.name} tampa={item.tampa} camisa={item.camisa} />}
        keyExtractor={item => item.id}
      />
      <FabOrganizer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    left: 300,
    top: 580
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    shadowColor: "#C0212E",
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 10
    },
  },
  menu: {
    backgroundColor: "#C0212E"
  },
  submenu: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: "#FF4554"
  }
})