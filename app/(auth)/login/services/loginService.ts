import api from "@/utils/axios";
import { UserLoginCredsType } from "../types";
import { AxiosError } from "axios";

export const userLoginService = async (data: UserLoginCredsType) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.data.type === "incorrectCreds"
    ) {
      throw error.response.data;
    }
  }
};
