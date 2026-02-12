import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL;

export const createSocketConnection = () => {
  return io(SOCKET_URL, {
    withCredentials: true,
  });
};

export default createSocketConnection;
