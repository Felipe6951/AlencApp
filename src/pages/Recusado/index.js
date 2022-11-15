import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';

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
        <View>
            <Text>A sua solicitaçãofoi recusada</Text>
            <TouchableOpacity 
            onPress={deleteUser(user) && deleteDoc(firestore, "membros", usuario[0]).then(() => {
                navigation.navigate("Register")
            })}>
                <Text>Clique aqui para poder tentar novamente</Text>
            </TouchableOpacity>
        </View>
    );
}