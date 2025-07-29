import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the server type
interface Server {
  bot_in_guild: boolean;
  id: number;
  name: string;
  icon: string | null;
  banner: string | null;
  owner: boolean;
  permissions: number; // Numeric bitmask
  permissions_new: string; // String-based bitmask (useful for BigInt)
  features: string[];
  approximate_member_count: number;
  approximate_presence_count: number;
  can_manage_server?: boolean; // New field to indicate permission
}

// Define the context type
interface DiscordServerContextType {
  servers: Server[];
  setServers: React.Dispatch<React.SetStateAction<Server[]>>;
  selectedServer: Server;
  setSelectedServer: React.Dispatch<React.SetStateAction<Server>>;
  showOnlyAccessible: boolean;
  setShowOnlyAccessible: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
const DiscordServerContext = createContext<DiscordServerContextType | undefined>(undefined);

// Provider component
export const DiscordServerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load data from localStorage or use default values
  const [servers, setServers] = useState<Server[]>(() => {
    const savedServers = localStorage.getItem("servers");
    return savedServers ? JSON.parse(savedServers) : [
      { id: 1, name: "Server One" },
      { id: 2, name: "Server Two" },
    ];
  });

  const [selectedServer, setSelectedServer] = useState<Server>(() => {
    const savedServer = localStorage.getItem("selectedServer");
    return savedServer ? JSON.parse(savedServer) : null;
  });

  const [showOnlyAccessible, setShowOnlyAccessible] = useState<boolean>(() => {
    const savedShowOnlyAccessible = localStorage.getItem("showOnlyAccessible");
    return savedShowOnlyAccessible ? JSON.parse(savedShowOnlyAccessible) : false;
  });

  // Save servers to localStorage when they change
  useEffect(() => {
    localStorage.setItem("servers", JSON.stringify(servers));
  }, [servers]);

  // Save selected server to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("selectedServer", JSON.stringify(selectedServer));
  }, [selectedServer]);

  // Save showOnlyAccessible to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("showOnlyAccessible", JSON.stringify(showOnlyAccessible));
  }, [showOnlyAccessible]);

  return (
    <DiscordServerContext.Provider value={{ 
      servers, 
      setServers, 
      selectedServer, 
      setSelectedServer,
      showOnlyAccessible,
      setShowOnlyAccessible
    }}>
      {children}
    </DiscordServerContext.Provider>
  );
};

// Custom hook to use the context
export const useDiscordServer = () => {
  const context = useContext(DiscordServerContext);
  if (!context) {
    throw new Error("useDiscordServer must be used within a DiscordServerProvider");
  }
  return context;
};

export const getSelectedServer = () => {
  return JSON.parse(localStorage.getItem("selectedServer") as string);
}
