import {SidebarProps} from './Sidebar.props';
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "@/context/user.context";
import styles from "./Sidebar.module.css";
import axios from "axios";
import {BlogType} from "@/interfaces/blogType.interface";


export const Sidebar = ({typeSidebar, ...props}: SidebarProps): JSX.Element => {
    const {usingTab, setUsingTab, userTab, setUserTab} = useContext(UserContext);
    const [blogType, setBlogType] = useState<BlogType[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<BlogType[]>(process.env.NEXT_PUBLIC_DOMAIN + 'blogType');
                setBlogType(response.data);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div> {typeSidebar === 'admin' ? (<div {...props}>
                <div className={styles.sidebarButtons}>
                    <button className={`${styles.tbutton} ${usingTab === 'CreateNews' ? styles.active : ''}`}
                            onClick={() => setUsingTab('CreateNews')}>
                        Создать новость
                    </button>
                    <button className={`${styles.tbutton} ${usingTab === 'EditNews' ? styles.active : ''}`}
                            onClick={() => setUsingTab('EditNews')}>
                        Редактировать новость
                    </button>
                    <button className={`${styles.tbutton} ${usingTab === 'AddType' ? styles.active : ''}`}
                            onClick={() => setUsingTab('AddType')}>
                        Добавить тему новости
                    </button>
                </div>
            </div>
        ) : (
            <div {...props}>
                <div className={styles.sidebarButtons}>
                    {blogType.map((item) => (
                        <button key={item.id} value={item.id} className={`${styles.tbutton} 
                        ${userTab === item.id ? styles.active : ''}`} onClick={() => setUserTab(item.id)}>
                            {item.blog_type_name}
                        </button>
                    ))}
                </div>
            </div>
        )
        }

        </div>

    );
};