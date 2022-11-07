import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';

import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore'
import { useState } from 'react';
import { useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const app = initializeApp(firebaseConfig);    
const firestore = getFirestore(app);

const q = query(collection(firestore, "membros"));
  
const [DATA, setData] = useState([])

  onSnapshot(q, (querySnapshot) => {
    const members = [];
    querySnapshot.forEach((doc) => {
      members.push({ ...doc.data(), id: doc.id });
    })
  
    setData(members);
  });
  
 
export default DATA;