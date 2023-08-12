import { SidebarProps } from './Sidebar.props';
import React, {useContext} from "react";
import {UserContext} from "@/context/user.context";
import styles from "./Sidebar.module.css";



export const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
	const { usingTab, setUsingTab } = useContext(UserContext);
	return (
		<div {...props}>
			<div className={styles.sidebarButtons}>
			<button className={`${styles.tbutton} ${usingTab === 'CreateNews' ? styles.active : ''}`}
					onClick={() => setUsingTab('CreateNews')}>
				Создать новость
			</button>
			<button className={`${styles.tbutton} ${usingTab === 'EditNews' ? styles.active : ''}`}
					onClick={() => setUsingTab('EditNews')}>
				Редактировать новость
			</button>
			</div>
		</div>
	);
};