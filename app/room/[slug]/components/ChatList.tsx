"use client";

import Button from "@/app/ui/Button";
import Link from "next/link";
import { ChatType } from "../types";
import { Hash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/features/store";
import { onSelectChat } from "@/features/roomsSlice";

interface ChatProps {
  id: number;
  chatName: string;
  roomName: string;
  roomId: number;
}

const Chat = ({ id, chatName, roomName, roomId }: ChatProps) => {
  const { selectedChat } = useSelector(
    (state: RootState) => state.roomsReducer,
  );

  const isActive =
    chatName.toLowerCase() === selectedChat?.chat_name.toLowerCase();

  const dispatch = useDispatch<AppDispatch>();

  const handleSelectChat = () => {
    dispatch(
      onSelectChat({
        id,
        chat_name: decodeURIComponent(chatName),
        room_id: roomId,
      }),
    );
  };

  return (
    <Link
      href={`/room/${roomName}-${roomId}-${decodeURIComponent(chatName.toLowerCase())}`}
      className="w-full"
    >
      <Button
        onClick={handleSelectChat}
        variant={isActive ? "secondary" : "outline"}
        className="w-full flex justify-center items-center"
      >
        <div className="flex gap-1 items-center">
          <Hash size={20} color="white" />
          <span>{chatName}</span>
        </div>
      </Button>
    </Link>
  );
};

interface ChatListProps {
  roomName: string;
  roomId: number;
  chats: ChatType[];
}

const ChatList = ({ chats, roomId, roomName }: ChatListProps) => {
  return (
    <div className="px-4 mt-4 space-y-2">
      <h1 className="text-white font-medium">Chats</h1>
      <div className="space-y-2">
        {chats?.map((chat) => (
          <Chat
            key={chat.id}
            id={chat.id}
            chatName={chat.chat_name}
            roomId={roomId}
            roomName={roomName}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
