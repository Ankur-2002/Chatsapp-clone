import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../Firebase';

const GetRecipient = async recipient => {
  const Collection = collection(db, 'users');
  const quer = query(Collection, where('email', '==', recipient));
  const data = await getDocs(quer);
  //   return data;
  return data?.docs?.[0]?.data();
};

export default GetRecipient;
