import axios from "axios";

export const api = axios.create({
  baseURL: "/baseurl",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
