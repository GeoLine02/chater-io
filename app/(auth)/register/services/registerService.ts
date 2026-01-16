import api from "@/utils/axios";
import { AxiosError } from "axios";
import { UserRegisterCredsType } from "../types";

export const userRegisterService = async (data: UserRegisterCredsType) => {
  try {
    const response = await api.post("/auth/register", data);

    return response.data;
  } catch (error) {
    if (
      error instanceof AxiosError &&
      error.response?.data.type === "existingEmail"
    ) {
      throw error.response.data;
    }

    if (
      error instanceof AxiosError &&
      error.response?.data.type === "existingUsername"
    ) {
      throw error.response.data;
    }
  }
};
