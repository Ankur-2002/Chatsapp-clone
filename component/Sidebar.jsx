import { Avatar, IconButton, Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chat from '@material-ui/icons/Chat';
import ChatList from './ChatList';
import Search from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../Firebase';
import {
  // addDoc,
  collection,
  doc,
  // getDocs,
  getDoc,
  query,
  where,
  setDoc,
  // CollectionReference,
  // DocumentReference,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [Chat, setChat] = React.useState([]);
  const Query = query(
    collection(db, 'userchats'),
    where('__name__', '==', user.email)
  );

  const [Collec, loading, error] = useCollection(Query);
  // console.log(Chat.chat);
  // console.log(Collec?.docs.map(doc => console.log(doc.data())));
  useEffect(() => {
    const get = async () => {
      const Collection = doc(db, 'userchats', user.email);

      const docs = await getDoc(Collection);
      if (docs.exists()) {
        // console.log(docs.data());
        if (docs.data()?.chat) {
          setChat(docs.data()?.chat);
        }
      } else {
        console.log('no data');
      }
    };
    try {
      get();
    } catch (error) {}
  }, []);

  const isChatExist = email => {
    return Chat.filter(chat => chat.user === email);
  };

  const CreateChat = async () => {
    const input = prompt('Enter a email for your chat')?.toLowerCase()?.trim();
    if (!input) return;

    // console.log(isChatExist(input), 'isChatExist');
    // console.log(Chat, 'Chat');
    if (
      EmailValidator.validate(input) &&
      input !== user.email &&
      isChatExist(input).length === 0
    ) {
      try {
        const Collection = doc(db, 'chat', input + '-' + user.email);
        const id = await setDoc(Collection, {
          chat: [],
        });

        const add = await setDoc(doc(db, 'userchats', user.email), {
          chat: [
            ...Chat,
            {
              id: input + '-' + user.email,
              user: input,
            },
          ],
        });

        setChat([
          ...Chat,
          {
            id: input + '-' + user.email,
            user: input,
          },
        ]);
        const add1 = doc(db, 'userchats', input);
        const collection = await getDoc(add1);
        if (collection.exists()) {
          console.log(collection.data());
          const chats = collection.data()?.chat;
          if (chats?.length) {
            const add2 = await setDoc(doc(db, 'userchats', input), {
              chat: [
                ...chats,
                {
                  id: input + '-' + user.email,
                  user: user.email,
                },
              ],
            });
          }
        } else {
          const add2 = await setDoc(doc(db, 'userchats', input), {
            chat: [
              {
                id: input + '-' + user.email,
                user: user.email,
              },
            ],
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const router = useRouter();
  return (
    <Container>
      <Header>
        <UserAvatar
          onClick={() => {
            router.replace('/');
            signOut(auth);
          }}
          src={user.photoURL}
        />
        <UserIconInfo>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <OptionIcon />
          </IconButton>
        </UserIconInfo>
      </Header>
      <SearchContainer>
        <Search />
        <SearchInput placeholder={'Search in chats'} />
      </SearchContainer>
      <SidebarButton onClick={CreateChat}>Start a new chat</SidebarButton>

      {/* Chat list  */}
      {Chat.map((chat, index) => {
        return (
          <ChatList
            key={index}
            user={chat.user}
            currentId={user.email}
            id={chat.id}
          />
        );
      })}
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  flex: 0.7;
  border-right: 1px solid #e6e6e6;
  height: 100vh;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
  justify-content: space-between;
  position: sticky;
  height: 80px;
  padding: 15px;
  top: 0;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  &:hover {
    opcaity: 0.8;
  }
`;
const UserIconInfo = styled.div`
  display: flex;
`;
const ChatIcon = styled(Chat)``;
const OptionIcon = styled(MoreVertIcon)``;
const SearchContainer = styled.div`
  padding: 10px;
  display: flex;
`;
const SearchInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 2px;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  border-top: 1px solid whitesmoke !important;
  border-bottom: 1px solid whitesmoke !important;
`;
