import generateUsers from 'data/users';
import generateChats from 'data/chats';
import _ from 'lodash'

import ClubLogoSvg from 'icons/club-logo.svg';
import UserInterface from 'types/users';
import ChatInterface from 'types/chats';
import MessageInterface from 'types/messages';
import Layout from 'components/Layout';
import Link from 'next/link'
import ChatList from 'components/ChatList';
import Logo from 'components/Logo';
import Overview from 'components/Overview';
import Search from 'components/Search';
import SideBar from 'components/Sidebar';

interface LandingPageProps {
  users: UserInterface[];
  chats: ChatInterface[];
  messages: MessageInterface[];
};

interface ChatLatestMessage {
  chatId: string,
  latestMessage: MessageInterface
}

const LandingPage = ({ users, chats, messages }: LandingPageProps) => {
  /**
   * DUPLICATE
   * For each chat,
   * Get the latest message with the timestamp
   */
  const latestMessagesPerChat = messages.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  const chatsLatestMessages = []
  chats.map(chat => {
    let chatLatestMessage: ChatLatestMessage = { chatId: null, latestMessage: null }
    chatLatestMessage.chatId = chat.id;
    chatLatestMessage.latestMessage = _.findLast(latestMessagesPerChat, message => message.chatId === chat.id && message.writtenByMe == false);
    chatsLatestMessages.push(chatLatestMessage);
  })

  return (
    <>
      <div className="flex">
        <div className="flex-auto border-r-4 border-gray-300">
          <SideBar chats={chats} chatsLatestMessages={chatsLatestMessages} messages={messages} users={users} />
        </div>
        <div className="flex-auto w-3/5">

        </div>
      </div>
    </>
  );
};

export const getServerSideProps = () => {
  // This is only an exemple of how you could pass data from server to client,
  // you may create another page and not use that use
  const users: UserInterface[] = generateUsers();
  const { chats, messages }: { chats: ChatInterface[], messages: MessageInterface[] } = generateChats();

  return {
    props: {
      users, chats, messages,
    },
  };
}

export default LandingPage;
