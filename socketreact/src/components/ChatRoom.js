import React, { useEffect, useState } from 'react'
import Message from './Message'
import ComposeMessage from './ComposeMessage'

const ChatRoom = ({username, name, chats}) => {
  const [userChats, setUserChats] = useState([])

  const handleNewMsg = (msg) => {
    setUserChats([...userChats, {side:"right", msg}]);
  }

  useEffect(() => {
    setUserChats(chats);
  }, [username, chats])
  
  return (
    <div className='border-4 border-black-400 w-5/6'>
      <Message name={name} msgs={userChats}/>
      <ComposeMessage username={username} newMsg={handleNewMsg}/>
    </div>
  )
}

export default ChatRoom