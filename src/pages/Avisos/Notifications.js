import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, orderBy, limit, doc } from 'firebase/firestore';

export default function Notifications() {

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const q = query(collection(firestore, "notificacoes"), orderBy("stamp", "desc"), limit(4));

    const [notification, setNotification] = useState([])

    useEffect(() => {
        onSnapshot(q, (querySnapshot) => {
            const alert = [];
            querySnapshot.forEach((doc) => {
                alert.push({ ...doc.data(), id: doc.id });
            })
            setNotification(alert);
        });
    }, []);

    // Item renderizado na FlatList
    const Item = ({ motive, description, created }) => (
        <View style={styles.notification}>
            <View style={styles.headerNotification}>
                <Ionicons name="alert-circle" size={22} color="#FFFFFF" style={{ marginRight: 4 }} />
                <Text style={styles.title}>{motive}</Text>
            </View>
            <View style={styles.boxDescription}>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.date}>{created}</Text>
            </View>
        </View>
    );

    if (notification == '') {
        return (
            <SafeAreaView style={styles.containerZero}>
                <Text style={styles.txtZero}>Nenhuma notificação.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <FlatList
                data={notification}
                renderItem={({ item }) => <Item motive={item.motive} description={item.description} created={item.created} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
}

// Estilização de componentes
const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
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
        height: '100%'
    },
    txtZero: {
        color: 'gray'
    }
})
