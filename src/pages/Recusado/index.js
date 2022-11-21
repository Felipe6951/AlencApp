import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where, doc, deleteDoc } from 'firebase/firestore'
import { getAuth, deleteUser } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Espera() {

    const navigation = useNavigation();
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const auth = getAuth(app)

    const user = auth.currentUser;

    const q = query(collection(firestore, "membros"), where("email", "==", user.email));

    const [usuario, setUser] = useState([])

    useEffect(() => {
        onSnapshot(q, (querySnapshot) => {
            const members = [];
            querySnapshot.forEach((doc) => {
                members.push(doc.data().name);
            })

            setUser(members);
            console.log(usuario[0]);
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/img/logo_afc.png')}
                style={{ width: 160, height: 180 }}
                resizeMode="contain"
            />
            <Text style={styles.message}>Seu cadastro foi recusado pela comissão organizadora.</Text>

            <TouchableOpacity
                onPress={deleteUser(user) && deleteDoc(firestore, "membros", usuario[0]).then(() => {navigation.navigate("Register")})}
            >
                <Text>Tentar novamente</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8C1F28',
        paddingHorizontal: 24,
        flexDirection: 'column'
    },
    message: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 18
    }
})
