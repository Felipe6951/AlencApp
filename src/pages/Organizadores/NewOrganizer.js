import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView, Dimensions, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Input } from 'native-base';
import { Ionicons, AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native'

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where, doc, updateDoc } from 'firebase/firestore'

const { width } = Dimensions.get('screen')

export default function NewOrganizer() {

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);

    const q = query(collection(firestore, "membros"), where("type", "==", "Jogador"));

    const [DATA, setData] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [list, setList] = useState(DATA);

    useEffect(() => {
        if (searchText === '') {
          setList(DATA);
        } else {
          setList(
            DATA.filter(item => (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || item.user.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || item.email.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || item.telefone.indexOf(searchText) > -1))
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

    const Item = ({ name, user, email, telefone }) => (
        <TouchableWithoutFeedback onPress={() => Alert.alert("Organizador", "Tornar organizador?", [{ text: "Não" }, { text: "Sim", onPress: () => updateDoc(doc(firestore, "membros", name), { type: "Organizador" }).then(() => { Alert.alert("Organizadores", name + "Agora é um organizador!") }) }])}>
            <View style={{ marginHorizontal: '5%', backgroundColor: '#FFFFFF', padding: 24, borderRadius: 8, marginBottom: 16, elevation: 5, shadowColor: '#505050' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginRight: 12 }}>
                        <FontAwesome name="user" size={22} color="#C0212E" />
                    </View>
                    <View>
                        <Text style={styles.span}>Nome</Text>
                        <Text style={styles.info}>{name}</Text>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: '#DDDDDD', width: width / 1.37, marginVertical: 8 }} />
                <View style={{ marginTop: 8 }}>
                    <View style={{ marginBottom: 4 }}>
                        <Text style={styles.infospan}>Usuário</Text>
                        <Text style={styles.info}>{user}</Text>
                    </View>
                    <View style={{ marginBottom: 4 }}>
                        <Text style={styles.infospan}>Email</Text>
                        <Text style={styles.info}>{email}</Text>
                    </View>
                    <View>
                        <Text style={styles.infospan}>Telefone</Text>
                        <Text style={styles.info}>{telefone}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <SafeAreaView style={{ backgroundColor: '#FAFAFA', height: '100%' }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={{ marginHorizontal: '5%', marginBottom: 16 }}>
                        <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="filter" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
                                <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Lista</Text>
                            </View>
                            <View style={{ backgroundColor: '#FFFFFF', borderRadius: 50, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                                <Text>{DATA.length}</Text>
                            </View>
                        </View>
                        <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', paddingHorizontal: 16, alignItems: 'center', paddingVertical: 12 }}>
                            <Text style={{ color: '#505050', fontSize: 12, marginBottom: 16 }}>Busque os jogadores pelo usuário, nome, email ou telefone para adicioná-lo aos organizadores.</Text>
                            <Input
                                placeholder="Buscar..."
                                fontSize={15}
                                variant="outline"
                                backgroundColor={'#F2F2F2'}
                                placeholderTextColor={'#888888'}
                                height={10}
                                value={searchText}
                                onChangeText={(text) => setSearchText(text)}
                                InputLeftElement={<AntDesign name="search1" size={18} color="#585858" style={{ marginLeft: 8 }} />}
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
                renderItem={({ item }) => <Item name={item.name} user={item.user} email={item.email} telefone={item.telefone} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    span: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#C0212E'
    },
    info: {
        fontSize: 15,
        color: '#505050'
    },
    infospan: {
        color: '#C0212E',
        fontSize: 15
    }
});