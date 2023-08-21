import React, {createContext, ReactNode, useState} from "react";



export type UserContextType = {
    usingTab: string;
    setUsingTab: React.Dispatch<React.SetStateAction<string>>;
    userTab: number;
    setUserTab: React.Dispatch<React.SetStateAction<number>>;
};

export const UserContext = createContext<UserContextType>({
    usingTab: "CreateNews",
    setUsingTab: () => {},
    userTab: 1,
    setUserTab: () => {},
});

type AppContextProviderProps = {
    children: ReactNode;
};

export const UserContextProvider = ({ children }: AppContextProviderProps) => {
    const [usingTab, setUsingTab] = useState("CreateNews");
    const [userTab, setUserTab] = useState(1);
    return (
        <UserContext.Provider value={{ usingTab, setUsingTab, userTab, setUserTab}}>
            {children}
        </UserContext.Provider>
    );
};