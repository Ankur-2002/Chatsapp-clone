import '../styles/globals.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../Firebase';
import Login from './login';
import Loading from '../component/Loading';
import { useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const put = async () => {
      if (user) {
        await setDoc(
          doc(db, 'users', user.uid),
          {
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            lastseen: serverTimestamp(),
          },
          {
            merge: true,
          }
        );
        localStorage.setItem('email', user.email);
      }
    };

    put();
  }, [user]);

  if (loading) return <Loading />;
  if (!user) {
    return <Login />;
  }
  return <Component {...pageProps} />;
}

export default MyApp;
