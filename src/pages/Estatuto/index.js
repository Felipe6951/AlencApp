import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Animated, TouchableWithoutFeedback } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as OpenAnything from 'react-native-openanything';
import DATA from '../Auxiliar/dataEstatuto'
import { useNavigation } from '@react-navigation/native';

export default function Estatuto() {

  class FabStatute extends Component {
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
          <TouchableWithoutFeedback>
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

  const Item = ({ year, url }) => (
    <View style={{ height: 136, elevation: 5, shadowColor: '#000000', backgroundColor: '#FFFFFF', marginHorizontal: '5%', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 16, marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Entypo name="book" size={20} color="#C0212E" style={{ marginRight: 8 }} />
        <View>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Estatuto - AFC</Text>
          <Text style={{ fontSize: 15, color: '#505050' }}>{year}</Text>
        </View>
      </View>

      <View style={{ borderBottomWidth: 1, borderBottomColor: '#DDDDDD', width: 288, alignSelf: 'center', marginBottom: 8 }} />

      <View style={{ alignSelf: 'center' }}>
        <TouchableOpacity
          style={{ backgroundColor: '#C0212E', width: 272, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 8 }}
          onPress={() => OpenAnything.Pdf(url)}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FFFFFF' }}>Visualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const CardHeader = () => (
    <View style={{ marginBottom: 24 }}>
      <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', marginHorizontal: '5%', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Entypo name="book" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
          <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Lista</Text>
        </View>

        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 50, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
          <Text>{DATA.length}</Text>
        </View>
      </View>

      <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', marginHorizontal: '5%', paddingHorizontal: 16, paddingTop: 24, paddingBottom: 16 }}>
        <Text style={{ color: '#505050', fontSize: 12 }}>Estatutos internos do Alencar Futebol Clube (AFC)</Text>
      </View>
    </View>
  );

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ backgroundColor: '#FAFAFA', height: '100%' }}>
      <FlatList
        ListHeaderComponent={
          <CardHeader />
        }
        data={DATA}
        renderItem={({ item }) => <Item year={item.year} url={item.url} />}
        keyExtractor={item => item.id}
      />
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