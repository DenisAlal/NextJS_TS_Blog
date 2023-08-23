import React, {useContext, useEffect, useState} from 'react';
import { Button, Htag, P, Rating, Tag } from '@/components';
import { withLayout } from '@/layout/Layout';
import { AppContext } from "@/context/app.context";
import axios from "axios";
import {BlogData} from "@/interfaces/blogData.interface";
import parse from "html-react-parser";
function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(4);
	const [userDataIndex, setUserDataIndex] = useState('');
	const { isAuthenticated, setIsAuthenticated, userData } = useContext(AppContext);

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
			{/*<Htag tag='h1'>Заголовок</Htag>*/}
			{/*<Button appearance='primary' arrow='right'>Кнопка</Button>*/}
			{/*<Button appearance='ghost' arrow='down'>Кнопка</Button>*/}
			{/*<Button appearance='primary' arrow='right' onClick={handleLogin}>*/}
			{/*	Войти*/}
			{/*</Button>*/}
			{/*<Button appearance='ghost' arrow='down' onClick={handleLogout}>*/}
			{/*	Выйти*/}
			{/*</Button>*/}
			{/*<P size='l'>Большой</P>*/}
			{/*<P>Средний</P>*/}
			{/*<P size='s'>Маленький</P>*/}
			{/*<Tag size='s'>Ghost</Tag>*/}
			{/*<Tag size='m' color='red'>Red</Tag>*/}
			{/*<Tag size='s' color='green'>Green</Tag>*/}
			{/*<Tag color='primary'>Green</Tag>*/}
			{/*<Rating rating={rating} isEditable setRating={setRating} />*/}
			{/*<div>{userDataIndex}</div>*/}


		</>
	);
}

export default withLayout(Home);