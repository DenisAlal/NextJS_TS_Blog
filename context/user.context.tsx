import React, {createContext, ReactNode, useState} from "react";

export type UserContextType = {
    usingTab: string;
    setUsingTab: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType>({
    usingTab: "CreateNews",
    setUsingTab: () => {},
});

type AppContextProviderProps = {
    children: ReactNode;
};

export const UserContextProvider = ({ children }: AppContextProviderProps) => {
    const [usingTab, setUsingTab] = useState("CreateNews");

    return (
        <UserContext.Provider value={{ usingTab, setUsingTab}}>
            {children}
        </UserContext.Provider>
    );
};