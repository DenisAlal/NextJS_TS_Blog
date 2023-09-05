import React, {useContext, useEffect, useState} from 'react';
import { withLayout } from '@/layout/Layout';
import { AppContext } from "@/context/app.context";
import {LoadContext} from "@/context/load.context";
function Home(): JSX.Element {
	const [userDataIndex, setUserDataIndex] = useState('');
	const { isAuthenticated, setIsAuthenticated, userData } = useContext(AppContext);
	useEffect(() =>{
		console.log(isAuthenticated);
	},[isAuthenticated]);
	useEffect(() =>{
		if (Object.entries(userData).length !== 0) {
			setUserDataIndex(userData.user.name);
		}
	},[userData]);

	return (
		<>
			Стартовая страница данного блога.
		</>
	);
}

export default withLayout(Home);