import { Avatar } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GetRecipient from '../Utils/GetRecipient';
const Chat = ({ currentId, user, id }) => {
  const router = useRouter();
  const [PhotoURL, setPhotoURL] = useState('');
  useEffect(() => {
    const get = async () => {
      const URL = await GetRecipient(user);
      if (URL) {
        setPhotoURL(URL.photo);
      }
    };
    get();
  }, [id]);
  // Problem here
  const goChat = async () => {
    router.replace(`/chat/${id}`);
  };

  return (
    <Container onClick={() => goChat()}>
      <UserAvatar>
        {PhotoURL ? <Avatar src={PhotoURL} /> : <Avatar>{user[0]}</Avatar>}
      </UserAvatar>
      <Name>{user}</Name>
    </Container>
  );
};
export default Chat;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-bottom: 1px solid #e6e6e6;

  &:hover {
    background-color: #e6e6e6;
    cursor: pointer;
  }
`;
const UserAvatar = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
`;
const Name = styled.p`
  width: 70%;
  font-weight: bold;
  text-align: left;
  word-break: break-word;
`;
