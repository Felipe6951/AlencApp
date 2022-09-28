import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';

import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore'
import { useState } from 'react';

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
  
  console.log("Current cities in CA: ", members.join(", "));
});

export default DATA;