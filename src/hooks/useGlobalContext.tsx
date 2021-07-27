import { createContext, useContext } from "react";

export type avatarType = "boy1" | "boy2" | "boy3" | "girl1" | "girl2" | "girl3";

export type GlobalContent = {
  avatar: avatarType;
  setAvatar: (avatar: avatarType) => void;
  name: string;
  setName: (name: string) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  avatar: "boy1", // set a default value
  setAvatar: () => {},
  name: "",
  setName: () => {},
});

export const useGlobalContext = () => useContext(MyGlobalContext);
