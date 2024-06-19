import axios from "axios";
import { User } from "../@types/user";
import { Bill } from "../@types/bill";

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

  signUp: async (data: User) => {
    try {
      const response = await api.post("/signup", data);
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
  },

  registerDebtor: async (data: {
    name: string;
    phone: string;
    email?: string;
  }) => {
    try {
      const response = await api.post("/debtor", data, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  findDebtorFromUser: async () => {
    try {
      const response = await api.get("/debtor", {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  findAllDebtors: async () => {
    try {
      const response = await api.get("/debtor/all", {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  registerBill: async (data: Bill) => {
    try {
      const response = await api.post("/bill", data, {
        headers: {
          Authorization: token,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  findAllBills: async () => {
    try {
      const response = await api.get("/bill", {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  findBillsFromDebtor: async (debtorId: string) => {
    try {
      const response = await api.get(`/bill/${debtorId}`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  setBillPayd: async (billId: string) => {
    const data = {
      date: new Date(),
    };
    try {
      const response = await api.patch(`/bill/${billId}`, data, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  updateBill: async (billId: string, data: Bill) => {
    try {
      const response = await api.put(`/bill/${billId}`, data, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
});
