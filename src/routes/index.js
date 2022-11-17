import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native'

import { getFirestore, collection, query, onSnapshot, where, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';

import Authroutes from './auth.routes';

export default function Routes() {

  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const firestore = getFirestore(app);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      if (user) {

        const q = query(collection(firestore, "membros"), where("email", "==", user.email));

        onSnapshot(q, (querySnapshot) => {
          const members = [];
          querySnapshot.forEach((doc) => {
            members.push(doc.data().type);
          })

          if (members[0] === "Organizador") {
            navigation.navigate("Admin")
          } else {
            if (members[0] === "Jogador") {
              navigation.navigate("Geral")
            } else {
              if (members[0] === "membro") {
                navigation.navigate("Espera")
              } else {
                if (members[0] === "Recusado") {
                  navigation.navigate("Recusado")
                } 
              }
            }
          }
        })
      }
    })

    return subscriber;

  }, []);

  return (
    <NavigationContainer>
      <Authroutes />
    </NavigationContainer>
  );
}