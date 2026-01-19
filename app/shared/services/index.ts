import api from "@/utils/axios";

export const fetchUserService = async () => {
  try {
    const res = await api.get("/user/me");

    if (res.status === 200) {
      const data = res.data;
      return data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
