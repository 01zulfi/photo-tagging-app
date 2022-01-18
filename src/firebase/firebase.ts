import {
  doc,
  getFirestore,
  getDoc,
  setDoc,
  updateDoc,
  Timestamp,
  collection,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
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

const fetchScores = async () => {
  const scoresRef = collection(getFirestore(), 'times');
  const scoresQuery = query(scoresRef, orderBy('name'));
  const scoreSnapshot = await getDocs(scoresQuery);
  const data: any[] = [];
  scoreSnapshot.forEach((score) => data.push(score.data()));
  return data;
};

const fetchImageURL = async () => {
  const storage = getStorage();
  const fetchURL = await getDownloadURL(
    ref(storage, 'egor-klyuchnyk-full-x-season-web.jpg'),
  );
  return fetchURL;
};

const firebase = {
  getUserId,
  getCharacterData,
  addUser,
  addEndTime,
  addName,
  addStartTime,
  getStartTime,
  fetchScores,
  fetchImageURL,
};

export default firebase;
