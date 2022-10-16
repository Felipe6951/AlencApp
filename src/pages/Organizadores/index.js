import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { Input } from 'native-base';
import { Ionicons, AntDesign, FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './stylesOrganizer';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where } from 'firebase/firestore'

export default function Organizadores() {

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);

  const q = query(collection(firestore, "membros"), where("type", "==", "Organizador"));

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
        <View style={[styles.fabContent, this.props.style]}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('NewOrganizer')}>
            <Animated.View style={[styles.fabButton, styles.submenu, addStyle]}>
              <Entypo name="plus" size={20} color="#FFFFFF" />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.toggleOptions} >
            <Animated.View style={[styles.fabButton, styles.menu, rotation]}>
              <Entypo name="plus" size={24} color="#FFFFFF" />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }

  const Item = ({ name, tampa, camisa }) => (
    <View style={styles.boxItem}>
      <View style={styles.boxItemName}>
        <FontAwesome name="user-circle" size={24} style={styles.itemIcon} />
        <View>
          <Text style={styles.itemClass}>Organizador</Text>
          <Text style={styles.itemName}>{name}</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.boxAlencar}>
        <Text style={styles.tshirt}>Camisa {camisa}</Text>
        <Text style={styles.cover}>Tampa: {tampa}</Text>
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
      InputLeftElement={<AntDesign name="search1" size={18} style={styles.searchIcons} />}
      InputRightElement={
        <TouchableOpacity onPress={() => setSearchOrganizer('')}>
          <MaterialIcons name="highlight-remove" size={20} style={styles.searchIcons} />
        </TouchableOpacity>
      }/>
  );

  const CardHeader = () => (
    <View style={styles.boxCard}>
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

