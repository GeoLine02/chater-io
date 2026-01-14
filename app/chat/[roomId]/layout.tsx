import ChatBox from "@/app/shared/ChatBox";
import ChatRoomHeader from "@/app/shared/ChatRoomHeader";
import ChatSidemenu from "@/app/shared/ChatSidemenu";
import OnlineUserSideMenu from "@/app/shared/OnlineUserSideMenu";

export default function ChatRoomLayout() {
  return (
    <div className="flex border border-border-default rounded-2xl w-full max-w-300 min-h-[90%] overflow-hidden">
      <ChatSidemenu />
      <section className="flex flex-col w-full">
        <ChatRoomHeader />
        <ChatBox />
      </section>
      <OnlineUserSideMenu />
    </div>
  );
}
