import Head from 'next/head';

import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>WhatsApp clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Sidebar />

      <h2>Lets build whatsApp clone</h2>
    </div>
  );
}
