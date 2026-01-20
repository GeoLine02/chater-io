import Logo from "../../../shared/components/Logo";
import UserPreivew from "../../../shared/components/UserPreivew";
import { ChatType } from "../types";
import ChatList from "./ChatList";

interface ChatSidemenuProps {
  chats: ChatType[];
  roomId: number;
  roomName: string;
}

export default function ChatSidemenu({
  chats,
  roomId,
  roomName,
}: ChatSidemenuProps) {
  return (
    <aside className="broder-r border-border-default w-full max-w-75 bg-bg-sidebar min-h-full">
      <section className="p-4 border-b border-border-default">
        <Logo />
      </section>
      <section className="border-b border-border-default">
        <UserPreivew />
      </section>
      <section>
        <ChatList chats={chats} roomId={roomId} roomName={roomName} />
      </section>
    </aside>
  );
}
