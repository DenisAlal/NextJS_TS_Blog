import {HeaderProps} from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "@/context/app.context";
import {func} from "prop-types";
import {useRouter} from "next/router";


export const Header = ({className, children, ...props}: HeaderProps): JSX.Element => {
    const {isAuthenticated, setIsOpenModalAuth, setIsOpenSettings, setIsOpenMenu} = useContext(AppContext);
    const [auth, setAuth] = useState<boolean>(false);
    const router = useRouter();
    useEffect(() => {
        setAuth(isAuthenticated);
    }, [isAuthenticated]);
    const handleOpenClick = (typeUser: string) => {
        if (typeUser === "guest") {
            setIsOpenModalAuth(true);
        } else if (typeUser === "authUser") {
            setIsOpenSettings(true);
        }

    };
    const handleOpenMenuClick = () => {
        setIsOpenMenu(true);
    };

    function goHome() {
        if (isAuthenticated) {
            router.push('/home');
        } else {
            router.push('/');
        }

    }

    return (
        <div className={cn(className, styles.header)}>
            <div className={styles.logo} onClick={goHome}>{children}</div>
            <div>
                {!auth ?
                    <div className={styles.buttonsMenu}>
                        <button onClick={() => handleOpenClick("guest")} className={styles.guest}>Войти</button>
                    </div>
                    :
                    <div className={styles.buttonsMenu}>

                        <button onClick={() => handleOpenMenuClick()} className={styles.menu}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 20 20">
                                <path
                                    d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"/>
                            </svg>
                        </button>
                        <button onClick={() => handleOpenClick("authUser")} className={styles.settings}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" height="25px" width="25px">
                                <circle cx="16" cy="7.48" r="5.48"/>
                                <path
                                    d="M23.54,30H8.46a4.8,4.8,0,0,1-4.8-4.8h0A10.29,10.29,0,0,1,13.94,14.92h4.12A10.29,10.29,0,0,1,28.34,25.2h0A4.8,4.8,0,0,1,23.54,30Z"/>
                            </svg>
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};