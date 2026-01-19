"use client";

import Button from "@/app/ui/Button";
import Modal from "@/app/ui/Modal";
import TextInput from "@/app/ui/TextInput";
import { createRoomThunk, onCloseCreateRoom } from "@/features/roomsSlice";
import { AppDispatch } from "@/features/store";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "@/context/UserContext";

export default function CreateRoomModal() {
  const [roomName, setRoomName] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();

  const handleCloseCreateRoom = () => {
    dispatch(onCloseCreateRoom());
  };

  const onCreateRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?.id) return;

    dispatch(
      createRoomThunk({
        roomName,
        userId: user.id,
      }),
    );
  };

  return (
    <Modal>
      <form
        onSubmit={onCreateRoom}
        className="border border-border-default bg-bg-panel w-full max-w-md space-y-4 p-4 rounded-xl"
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium text-white">Create Room</h1>
          <X
            onClick={handleCloseCreateRoom}
            className="cursor-pointer"
            size={25}
            color="white"
          />
        </div>
        <div className="space-y-1">
          <label className="font-medium text-white inline-block">
            Room Name
          </label>
          <TextInput
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            name="roomName"
            placeholder="Enter Room name"
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant={"primary"}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
