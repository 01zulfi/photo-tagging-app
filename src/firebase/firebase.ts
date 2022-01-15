import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
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
      start: Timestamp.now(),
    });
  });
};

const addStartTime = async () => {
  const userRef = doc(getFirestore(), 'times', userId);
  await updateDoc(userRef, {
    start: Timestamp.now(),
  });
};

const getUserId = () => userId;

const addEndTime = async () => {
  const userRef = doc(getFirestore(), 'times', userId);
  const userSnap = await getDoc(userRef);

  const data = userSnap.data();

  if (!data) return;
  const end = Timestamp.now();
  await updateDoc(userRef, {
    end,
    score: end.seconds - data.start.seconds,
  });
};

const addName = async (name: string) => {
  const userRef = doc(getFirestore(), 'times', userId);
  await updateDoc(userRef, {
    name,
  });
};

const getStartTime = async () => {
  const userRef = doc(getFirestore(), 'times', userId);
  const userSnap = await getDoc(userRef);

  const data = userSnap.data();
  return data?.start.seconds;
};

const firebase = {
  getUserId,
  getCharacterData,
  addUser,
  addEndTime,
  addName,
  addStartTime,
  getStartTime,
};

export default firebase;
