"use client";

import Button from "@/app/ui/Button";
import { useUser } from "@/context/UserContext";
import { fetchAllRoomsByUserThunk } from "@/features/roomsSlice";
import { AppDispatch, RootState } from "@/features/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface RoomProps {
  roomName: string;
}

const Room = ({ roomName }: RoomProps) => {
  return <Button variant={"outline"}>{roomName}</Button>;
};

export default function RoomsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();

  useEffect(() => {
    dispatch(fetchAllRoomsByUserThunk(user?.id as number));
  }, [user?.id, dispatch]);

  const { rooms } = useSelector((state: RootState) => state.roomsReducer);
  console.log("rooms", rooms);
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-white font-medium text-lg">All Room</h1>
      {rooms?.map((room) => (
        <Room key={room.id} roomName={room.room_name} />
      ))}
    </div>
  );
}
