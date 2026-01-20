import api from "@/utils/axios";

export const getRoomChats = async (roomId: number) => {
  try {
    const res = await api.get(`/chat/all/${roomId}`);

    if (res.status === 200) {
      const data = res.data.chats;
      console.log("data", data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
