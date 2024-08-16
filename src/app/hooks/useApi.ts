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
      console.log(process.env.NEXT_PUBLIC_API_URL);
      const response = await api.post("/login", data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
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
    const response = await api.get("/verify", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
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

  registerBill: async (data: Omit<Bill, "created_at" | "active">) => {
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

  setBillPaid: async (billId: string) => {
    const data = {
      date: new Date(),
    };
    try {
      const response = await api.patch(`/bill/set_payd/${billId}`, data, {
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

  updateBill: async (billId: string, data: any) => {
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
