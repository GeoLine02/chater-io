import { getAllRoomsByUserIdService } from "@/app/me/services/rooms";
import { ChatType } from "@/app/room/[slug]/types";
import { RoomType } from "@/types/rooms";
import api from "@/utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  isCreateRoomOpen: boolean;
  rooms: RoomType[];
  isLoading: boolean;
  selectedRoom: RoomType | null;
  selectedChat: ChatType | null;
}

const initialState: initialStateType = {
  isCreateRoomOpen: false,
  rooms: [],
  isLoading: false,
  selectedRoom: null,
  selectedChat: null,
};

interface CreateRoomArgs {
  roomName: string;
  userId: number;
}

export const createRoomThunk = createAsyncThunk<
  RoomType, // return type
  CreateRoomArgs, // args type
  { rejectValue: string }
>("rooms/createRoom", async ({ roomName, userId }, { rejectWithValue }) => {
  try {
    const res = await api.post("/room/create", { roomName, userId });

    if (res.status !== 201) {
      return rejectWithValue("Failed to create room");
    }

    const room = res.data.room;

    return room;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return rejectWithValue(error.response?.data.message || error.message);
  }
});

export const fetchAllRoomsByUserThunk = createAsyncThunk(
  "rooms/fetchAllRoomsByUser",
  async (userId: number, thunkAPI) => {
    try {
      const rooms = await getAllRoomsByUserIdService(userId);
      return rooms;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const roomsSlice = createSlice({
  name: "roomsSlice",
  initialState,
  reducers: {
    onOpenCreateRoom: (state) => {
      state.isCreateRoomOpen = true;
    },
    onCloseCreateRoom: (state) => {
      state.isCreateRoomOpen = false;
    },

    onSelectChat: (state, action) => {
      state.selectedChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    // create room
    builder
      .addCase(createRoomThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRoomThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rooms = [...state.rooms, action.payload];
        state.isCreateRoomOpen = false;
      })
      .addCase(createRoomThunk.rejected, (state) => {
        state.isLoading = false;
      })

      // get all rooms by user id

      .addCase(fetchAllRoomsByUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllRoomsByUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchAllRoomsByUserThunk.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { onOpenCreateRoom, onCloseCreateRoom, onSelectChat } =
  roomsSlice.actions;
export default roomsSlice.reducer;
