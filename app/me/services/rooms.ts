import api from "@/utils/axios";

export const createRoomService = async (roomName: string, userId: number) => {
  try {
    const res = await api.post("/room/create", { roomName, userId });
    if (res.status === 201) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllRoomsByUserIdService = async (userId: number) => {
  try {
    const res = await api.get(`/room/all/${userId}`);

    if (res.status === 200) {
      const data = res.data.rooms;
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
