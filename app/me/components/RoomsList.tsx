"use client";

import Button from "@/app/ui/Button";
import { useUser } from "@/context/UserContext";
import { fetchAllRoomsByUserThunk } from "@/features/roomsSlice";
import { AppDispatch, RootState } from "@/features/store";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface RoomProps {
  id: number;
  roomName: string;
}

const Room = ({ id, roomName }: RoomProps) => {
  return (
    <Link className="w-full" href={`/room/${roomName}-${id}-general`}>
      <Button className="w-full" variant={"outline"}>
        {roomName}
      </Button>
    </Link>
  );
};

export default function RoomsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();

  useEffect(() => {
    dispatch(fetchAllRoomsByUserThunk(user?.id as number));
  }, [user?.id, dispatch]);

  const { rooms } = useSelector((state: RootState) => state.roomsReducer);
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-white font-medium text-lg">All Room</h1>
      {rooms?.map((room) => (
        <Room key={room.id} id={room.id} roomName={room.room_name} />
      ))}
    </div>
  );
}
