import ChatBox from "./components/ChatBox";
import ChatInput from "./components/ChatInput";
import ChatRoomHeader from "./components/ChatRoomHeader";
import ChatSidemenu from "./components/ChatSidemenu";
import OnlineUserSideMenu from "./components/OnlineUserSideMenu";
import { getRoomChats } from "./service/roomChats";

interface ChatRoomProps {
  params: Promise<{ slug: string }>;
}

export default async function ChatRoom({ params }: ChatRoomProps) {
  const slug = (await params).slug;

  const [roomName, roomId, roomChat] = slug.split("-");

  console.log(roomName, roomId, roomChat);

  const chats = await getRoomChats(Number(roomId));

  console.log(chats);

  return (
    <div className="flex h-screen">
      <ChatSidemenu roomId={Number(roomId)} roomName={roomName} chats={chats} />
      <section className="flex flex-col flex-1 h-full">
        <ChatRoomHeader />
        <div className="flex-1">
          <div className="flex flex-col h-full p-6">
            <ChatBox />
            <ChatInput />
          </div>
        </div>
      </section>
      <OnlineUserSideMenu />
    </div>
  );
}
