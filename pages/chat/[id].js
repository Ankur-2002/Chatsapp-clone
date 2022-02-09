import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import ChatBar from '../../component/ChatBar';
import Sidebar from '../../component/Sidebar';
import { db } from '../../Firebase';
const Chats = ({ chat, user, chatWith, id }) => {
  console.log(id);
  const router = useRouter();
  console.log(router);
  return (
    <Container>
      <Sidebar />
      <ChatBar
        user={localStorage.getItem('email')}
        key={chatWith === localStorage.getItem('email') ? user : chatWith}
        id={id}
        chat={JSON.parse(chat)}
        chatWith={chatWith === localStorage.getItem('email') ? user : chatWith}
      />
    </Container>
  );
};
export default Chats;

export const getServerSideProps = async ctx => {
  const EncodeURL = ctx.query.id;

  const url = EncodeURL.split('-');

  const UserChat = doc(db, 'chat', EncodeURL);
  const CurrentUser = await getDoc(UserChat);

  if (CurrentUser.exists()) {
    const userchat = CurrentUser.data()?.chat;

    return {
      props: {
        chat: JSON.stringify(userchat),
        user: url[1],
        chatWith: url[0],
        id: EncodeURL,
      },
    };
  }
  return {
    props: {
      chat: [],
      user: '',
      chatWith: '',
    },
  };
};

const Container = styled.div`
  display: flex;
`;
