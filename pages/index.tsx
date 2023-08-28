import React, {useContext, useEffect, useState} from 'react';
import { Button, Htag, P, Rating, Tag } from '@/components';
import { withLayout } from '@/layout/Layout';
import { AppContext } from "@/context/app.context";
import axios from "axios";
import {BlogData} from "@/interfaces/blogData.interface";
import parse from "html-react-parser";
import {LoadContext} from "@/context/load.context";
function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(4);
	const [userDataIndex, setUserDataIndex] = useState('');
	const { isAuthenticated, setIsAuthenticated, userData } = useContext(AppContext);

	const {isLoading, setIsLoading} = useContext(LoadContext);
	const handleLogin = () => {
		setIsAuthenticated(true);
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
	};
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

		</>
	);
}

export default withLayout(Home);