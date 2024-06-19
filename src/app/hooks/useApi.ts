import axios from "axios";

let token: string;
if (typeof window !== "undefined") {
  if (localStorage.getItem("token")) {
    token = `Bearer ${localStorage.getItem("token")}`;
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const useApi = () => ({
  signIn: async (data: { email: string; password: string }) => {
    try {
      const response = await api.post("/login", data);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  checkToken: async () => {
    try {
      const response = await api.get("/verify", {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
});
