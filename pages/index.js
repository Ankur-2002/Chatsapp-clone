/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head';
import Sidebar from '../component/Sidebar';
import Image from 'next/image';
import { Whatsapp } from '../asset';
export default function Home(props) {
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Head>
        <title>Whatsapp 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar />
      <div
        style={{
          flex: 2,
          display: 'flex',
          justifyContent: 'center',
          background: '#f8f8f8',
        }}
      >
        <Image src={Whatsapp} />
      </div>
    </div>
  );
}
