"use client";
import { MyUserContextProvider } from "@/hooks/useUser";
import { UserProviderProps } from "@/types";

//To get user details and session from MyUserContext
const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
