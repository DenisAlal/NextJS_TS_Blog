import React, {createContext, ReactNode, useState} from "react";
export type UserData = {
	user: {
		id: number;
		name: string;
		email: string;
		email_verified_at: string | null;
		created_at: string;
		updated_at: string;
	};
};
export type AppContextType = {
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	isOpenModalAuth: boolean;
	setIsOpenModalAuth: React.Dispatch<React.SetStateAction<boolean>>;
	isOpenSettings: boolean;
	setIsOpenSettings: React.Dispatch<React.SetStateAction<boolean>>;
	userData: UserData;
	setUserData: React.Dispatch<React.SetStateAction<UserData>>
};

export const AppContext = createContext<AppContextType>({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	isOpenModalAuth: false,
	setIsOpenModalAuth: () => {},
	userData: {} as UserData,
	setUserData: () => {},
	isOpenSettings:  false,
	setIsOpenSettings: () => {},
});

type AppContextProviderProps = {
	children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isOpenModalAuth, setIsOpenModalAuth] = useState(false);
	const [isOpenSettings, setIsOpenSettings] = useState(false);
	const [userData, setUserData] = useState<UserData>({} as UserData);
	return (
		<AppContext.Provider value={{ isAuthenticated, setIsAuthenticated , isOpenModalAuth, setIsOpenModalAuth, userData, setUserData, isOpenSettings, setIsOpenSettings}}>
			{children}
		</AppContext.Provider>
	);
};