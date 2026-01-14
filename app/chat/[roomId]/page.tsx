import ChatBox from "@/app/chat/[roomId]/components/ChatBox";
import ChatInput from "./components/ChatInput";

export default function ChatRoom() {
  return (
    <div className="flex flex-col h-full p-6">
      <ChatBox />
      <ChatInput />
    </div>
  );
}
