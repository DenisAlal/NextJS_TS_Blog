import {ModalAuthProps} from "@/components/ModalAuth/ModalAuth.props";
import styles from './ModalMenu.module.css'
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "@/context/app.context";
import {UserContext} from "@/context/user.context";
import {useRouter} from "next/router";
import {BlogType} from "@/interfaces/blogType.interface";
import axios from "axios";

export const ModalMenu = ({children, className}: ModalAuthProps): JSX.Element => {
    const {setIsOpenMenu} = useContext(AppContext);
    const {usingTab, setUsingTab, userTab, setUserTab} = useContext(UserContext);
    const [userMenu, setUserMenu] = useState(false);

    function handleCloseClick() {
        setIsOpenMenu(false);
    }

    const router = useRouter();
    useEffect(() => {
        if (router.pathname === "/home") {
            setUserMenu(true);
        }
    }, [router]);
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
        <div className={styles.moverlay}>
            <div className={styles.mwrapper}>
                <div className={styles.modal}>
                    <div className={styles.mheader}>
                        {userMenu ? <span>Выберите тему</span> :
                        <span>Меню</span>}
                        <a href="#" onClick={() => handleCloseClick()}>
                            ✖
                        </a>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.mbody}>

                        {userMenu ? <div className={styles.sidebarButtons}>
                                {blogType.map((item) => (
                                    <button key={item.id} value={item.id} className={`${styles.tbutton} 
                        ${userTab === item.id ? styles.active : ''}`} onClick={() => setUserTab(item.id)}>
                                        {item.blog_type_name}
                                    </button>
                                ))}
                            </div> :
                            <div className={styles.sidebarButtons}>
                                <button
                                    className={`${styles.tbutton} ${usingTab === 'CreateNews' ? styles.active : ''}`}
                                    onClick={() => {
                                        setUsingTab('CreateNews');
                                        handleCloseClick();
                                    }}>
                                    Создать новость
                                </button>
                                <button className={`${styles.tbutton} ${usingTab === 'EditNews' ? styles.active : ''}`}
                                        onClick={() => {
                                            setUsingTab('EditNews');
                                            handleCloseClick();
                                        }}>
                                    Редактировать новость
                                </button>
                                <button className={`${styles.tbutton} ${usingTab === 'AddType' ? styles.active : ''}`}
                                        onClick={() => {
                                            setUsingTab('AddType');
                                            handleCloseClick();
                                        }}>
                                    Добавить тему новости
                                </button>
                            </div>
                        }


                    </div>
                </div>
            </div>
        </div>
    );
};