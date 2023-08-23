import {ModalAuthProps} from "@/components/ModalAuth/ModalAuth.props";
import styles from './ModalSettings.module.css'
import React, {useContext, useEffect, useState} from "react";
import {AppContext, UserData} from "@/context/app.context";
import axios from "axios";
import {useRouter} from "next/router";
export const ModalSettings = ({children, className}: ModalAuthProps): JSX.Element => {
    const {setIsOpenModalAuth, setIsOpenSettings,
        setUserData, setIsAuthenticated, userData
    } = useContext(AppContext);
    const [admin , setAdmin] = useState(false)
    const router = useRouter();
    function handleCloseClick() {
        setIsOpenSettings(false);
    }

    useEffect(() => {
        if (Object.entries(userData).length !== 0) {
            const typeUser = userData.user.role;
            console.log(typeUser)
            if (typeUser === "user") {
               setAdmin(false);
            } else {
                setAdmin(true);
            }
        }

    }, [userData]);
    async function logout() {

        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + 'user', {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    });
                    localStorage.setItem('jwtToken', '');
                    setUserData({} as UserData);
                    setIsAuthenticated(false);
                    setIsOpenSettings(false);
                    router.push('/');
                    console.info(response.data);
                } catch (error) {
                    console.error(error);
                }
            };

            fetchData();
        } else {
            router.push('/');
        }
    }
    function goAdmin() {
        console.log(router.pathname)
        if(router.pathname === '/admin') {
            handleCloseClick();
        } else {
            router.push('/admin');
        }
    }

    return (
        <div className={styles.moverlay}>
            <div className={styles.mwrapper}>
                <div className={styles.modal}>
                    <div className={styles.mheader}>
                        <span >Настройки</span>
                        <a href="#" onClick={() => handleCloseClick()} >
                            ✖
                        </a>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.mbody}>
                        <button className={styles.tbutton}>12312</button>
                        <button className={styles.tbutton}>12312</button>
                        {admin &&
                            <button className={styles.tbutton} onClick={() => goAdmin()}>go admin</button>
                        }
                        <button className={styles.tbutton} onClick={() => logout()}>Выйти</button>
                    </div>
                </div>
            </div>
        </div>
    );
};