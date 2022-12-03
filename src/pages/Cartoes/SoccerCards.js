import React, { useState, useEffect, Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList, Animated, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, orderBy, limit, doc } from 'firebase/firestore';

export default function SoccerCards() {

    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const q = query(collection(firestore, "cartoes"), orderBy("stamp", "desc"), limit(15)); 

    const [note, setNote] = useState([])

    class FabNewCard extends Component { // Componente FAB
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

            const firstSubmenu = {
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

                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.toggleOptions();
                            navigation.navigate('NewSoccerCard')
                        }}
                    >
                        <Animated.View style={[styles.fabButton, styles.submenu, styles.align, firstSubmenu]}>
                            <Text style={styles.fabText}> Nova anotação </Text>
                            <MaterialCommunityIcons name="cards" size={20} color="#FFFFFF" style={styles.submenuIcon} />
                        </Animated.View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={this.toggleOptions}>
                        <Animated.View style={[styles.fabButton, styles.menu, rotation]}>
                            <Entypo name="plus" size={24} color="#FFFFFF" />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            );
        }
    }

    useEffect(() => {
        onSnapshot(q, (querySnapshot) => {
            const card = [];
            querySnapshot.forEach((doc) => {
                card.push({ ...doc.data(), id: doc.id });
            })
            setNote(card)
        });
    }, []);

    // Item renderizado na FlatList
    const Item = ({ cardYellow, cardRed, created }) => (
        <View style={styles.notification}>
            <View style={styles.headerNotification}>
                <MaterialCommunityIcons name="cards" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.title}>{created}</Text>
            </View>
            <View style={styles.boxDescription}>
                <View style={styles.boxNoteTop}>
                    <Text style={styles.cardTitle}>Amarelo</Text>
                    <Text style={styles.description}>{cardYellow}</Text>
                </View>
                <View style={styles.boxNoteBottom}>
                    <Text style={styles.cardTitle}>Vermelho</Text>
                    <Text style={styles.description}>{cardRed}</Text>
                </View>

            </View>
        </View>
    );

    if (note == '') {
        return (
            <SafeAreaView style={styles.containerZero}>
                <Text style={styles.txtZero}>Nenhuma anotação.</Text>
                <FabNewCard />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <FlatList
                style={{ marginTop: 24 }}
                data={note}
                renderItem={({ item }) => <Item cardYellow={item.cardYellow} cardRed={item.cardRed} created={item.created} />}
                keyExtractor={(item) => item.id}
            />

            <FabNewCard />
        </SafeAreaView>
    );
}

// Estilização de componentes
const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#FAFAFA",
    },
    boxDescription: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: "#FFFFFF",
        paddingTop: 16,
        paddingBottom: 8,
        paddingHorizontal: 16,
        elevation: 5,
        shadowColor: '#505050',
        width: '90%',
    },
    title: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 18,
    },
    headerNotification: {
        width: '100%',
        paddingLeft: 16,
        paddingVertical: 12,
        backgroundColor: '#8C1F28',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        flexDirection: 'row',
        alignItems: "center",
        width: '90%'
    },
    description: {
        textAlign: "justify"
    },
    date: {
        alignSelf: 'flex-end',
        marginTop: 8,
        fontSize: 12,
        color: '#C0212E'
    },
    notification: {
        marginBottom: 16,
        alignItems: "center"
    },
    containerZero: {
        alignItems: "center",
        paddingVertical: 24,
        backgroundColor: "#FAFAFA",
        height: '100%',
    },
    txtZero: {
        color: 'gray',
        marginTop: 24
    },
    cardTitle: {
        color: '#C0212E'
    },
    boxNoteTop: {
        marginBottom: 12
    },
    boxNoteBottom: {
        marginBottom: 16
    },
    fabContent: {
        alignItems: 'center',
        position: 'absolute',
        left: '82%',
        bottom: '14%'
    },
    fabButton: {
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
        }
    },
    fabText: {
        right: 75,
        fontSize: 12,
        backgroundColor: "#FFFFFF",
        color: '#FF4554',
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignItems: "center",
        width: '220%',
        bottom: -10,
        right: 88
    },
    submenuIcon: {
        right: 1,
        bottom: 11
    },
    menu: {
        backgroundColor: "#C0212E",
    },
    submenu: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        backgroundColor: "#FF4554"
    }
})
