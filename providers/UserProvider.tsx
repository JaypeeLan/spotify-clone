"use client";
import { MyUserContextProvider } from "@/hooks/useUser";
import { UserProviderProps } from "@/types";

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
