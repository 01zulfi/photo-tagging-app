import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

let userId = '';

const getCharacterData = async (character: string) => {
  const characterRef = doc(getFirestore(), 'characters', character);
  const characterSnap = await getDoc(characterRef);
  return characterSnap.data();
};

const addUser = async () => {
  const auth = getAuth();
  signInAnonymously(auth).catch((error) => console.log(error));
  onAuthStateChanged(auth, async (user) => {
    if (!user) return;
    userId = user.uid;
    await setDoc(doc(getFirestore(), 'times', user.uid), {
      id: user.uid,
      start: Date.now(),
    });
  });
};

const addEndTime = async () => {
  const userRef = doc(getFirestore(), 'times', userId);
  const userSnap = await getDoc(userRef);

  const data = userSnap.data();

  if (!data) return;
  const { start } = data;
  const end = Date.now();
  await updateDoc(userRef, {
    end,
    score: (start - end) * 0.001,
  });
};

const addName = async (name: string) => {
  const userRef = doc(getFirestore(), 'times', userId);
  await updateDoc(userRef, {
    name,
  });
};

const firebase = { getCharacterData, addUser, addEndTime, addName };

export default firebase;
