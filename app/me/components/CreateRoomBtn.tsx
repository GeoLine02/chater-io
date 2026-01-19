"use client";

import Button from "@/app/ui/Button";
import { onOpenCreateRoom } from "@/features/roomsSlice";
import { AppDispatch, RootState } from "@/features/store";
import { useDispatch, useSelector } from "react-redux";
import CreateRoomModal from "./CreateRoomModal";

export default function CreateRoomBtn() {
  const dispatch = useDispatch<AppDispatch>();

  const hnadleOpenCreateRoom = () => {
    dispatch(onOpenCreateRoom());
  };

  const { isCreateRoomOpen } = useSelector(
    (state: RootState) => state.roomsReducer,
  );

  return (
    <div className="p-4 relative">
      <Button
        onClick={hnadleOpenCreateRoom}
        className="w-full"
        variant={"primary"}
      >
        Create Room
      </Button>

      {isCreateRoomOpen && <CreateRoomModal />}
    </div>
  );
}
