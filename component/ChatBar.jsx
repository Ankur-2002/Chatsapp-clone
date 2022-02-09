/* eslint-disable @next/next/no-img-element */
import { Avatar, IconButton, Input } from '@material-ui/core';
import { AttachFile, MoreVertOutlined, SendOutlined } from '@material-ui/icons';
import Head from 'next/head';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import GetRecipient from '../Utils/GetRecipient';
import { WhatsappDoddle } from '../asset/index';
import Image from 'next/image';
import TimeAgo from 'timeago-react';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const ChatBar = ({ user, chat, chatWith, id }) => {
  const [currentUser, setCurrentUser] = useState({});
  //  q .log(new Date(currentUser.lastseen?.seconds * 1000).toISOString());
  const [CHATS, setCHATS] = useState(chat);
  console.log(CHATS);
  useEffect(() => {
    const get = async () => {
      const recipient = await GetRecipient(chatWith);

      setCurrentUser(recipient);
    };
    get();
  }, [chatWith]);
  const [users] = useAuthState(auth);
  const [userMessage, setMessage] = useState('');
  const SendMessage = async () => {
    await setDoc(
      doc(db, 'users', users.uid),
      {
        name: users.displayName,
        email: users.email,
        photo: users.photoURL,
        lastseen: serverTimestamp(),
      },
      {
        merge: true,
      }
    );

    const DOC = doc(db, 'chat', id);
    const docRef = await updateDoc(DOC, {
      chat: [...CHATS, { message: userMessage, time: new Date(), user: user }],
    });

    setCHATS([
      ...CHATS,
      {
        message: userMessage,
        time: new Date(),
        user: user,
      },
    ]);

    setMessage('');
  };

  return (
    <Container key={chatWith}>
      <Head>
        <title>Chat with {chatWith}</title>
      </Head>
      <Header key={chatWith}>
        <ChatContainer>
          <Avatar src={currentUser?.photo} />
          <TimeZone>
            <h3>{chatWith}</h3>
            <p>
              {currentUser?.lastseen ? (
                <TimeAgo datatime={currentUser.lastseen.toDate()} />
              ) : (
                'Unavailable'
              )}
            </p>
          </TimeZone>
        </ChatContainer>
        <IconsContainer>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertOutlined />
          </IconButton>
        </IconsContainer>
      </Header>
      <Chats>
        {/* <ImageContainer></ImageContainer> */}

        {CHATS?.map(item =>
          // eslint-disable-next-line react/jsx-key
          item.user !== localStorage.getItem('email') ? (
            <Left>
              <Message>{item?.message}</Message>
            </Left>
          ) : (
            <Right>
              <Message>{item.message}</Message>
            </Right>
          )
        )}
      </Chats>
      <Footer>
        <Input onChange={e => setMessage(e.target.value)} value={userMessage} />
        <IconButton>
          <SendOutlined onClick={SendMessage} />
        </IconButton>
      </Footer>
    </Container>
  );
};

export default ChatBar;
const ImageContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 100%;
`;
const Message = styled.div`
  width: max-content;
  background-color: #00a884;
  padding: 0.5rem;
  font-family: Rubik, sans-serif;
  font-weight: 600;
  font-size: 18px;
  border-radius: 0.5rem;
`;
const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0.5rem;
`;
const Right = styled.div`
  display: flex;
  padding: 0.8rem;
  justify-content: flex-end;
  margin-right: 1rem;
  div {
    background: white;
    border-radius: 0.5rem;
  }
`;
const Container = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Header = styled.div`
  height: 5rem;
  height: 10%;
  background: white;
  border-bottom: 1px solid whitesmoke;
  display: flex;
  align-items: center;
`;
const Footer = styled.div`
  display: flex;
  self-align: flex-end;
  height: 7%;
  .MuiInputBase-root {
    width: 100%;
    padding: 0.5rem;
    &:after {
      border: none;
    }
    &:before {
      content: '';
    }
  }
`;
const Chats = styled.div`
  background: #0b141a;
  height: 83%;
  overflow: scroll;
  overflow-x: hidden;
`;

const Title = styled.div`
  font-size: 20px;
`;
const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
`;
const IconsContainer = styled.div``;
const TimeZone = styled.div`
  line-height: 0.1rem;
`;
