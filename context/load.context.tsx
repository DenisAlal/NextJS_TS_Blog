import React, {createContext, ReactNode, useState} from "react";

export type AppContextType = {
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadContext = createContext<AppContextType>({
	isLoading: false,
	setIsLoading: () => {},

});

type LoadContextProviderProps = {
	children: ReactNode;
};

export const LoadContextProvider = ({ children }: LoadContextProviderProps) => {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<LoadContext.Provider value={{ isLoading, setIsLoading}}>
			{children}
		</LoadContext.Provider>
	);
};