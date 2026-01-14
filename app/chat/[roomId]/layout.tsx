import ChatRoomHeader from "@/app/chat/[roomId]/components/ChatRoomHeader";
import ChatSidemenu from "@/app/chat/[roomId]/components/ChatSidemenu";
import OnlineUserSideMenu from "@/app/chat/[roomId]/components/OnlineUserSideMenu";

interface ChatRoomLayoutProps {
  children: React.ReactNode;
}

export default function ChatRoomLayout({ children }: ChatRoomLayoutProps) {
  return (
    <div className="flex h-screen">
      <ChatSidemenu />
      <section className="flex flex-col flex-1 h-full">
        <ChatRoomHeader />
        <div className="flex-1">{children}</div>
      </section>
      <OnlineUserSideMenu />
    </div>
  );
}
