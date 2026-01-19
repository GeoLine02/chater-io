"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { socket } from "@/socket";
import { useUser } from "./UserContext";
interface SocketContextType {
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const { user } = useUser();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    socket.emit("connection");
    onConnect();
  }, [user]);

  return (
    <SocketContext.Provider value={{ isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
