import {HeaderProps} from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "@/context/app.context";


export const Header = ({className, children, ...props}: HeaderProps): JSX.Element => {
    const {isAuthenticated, setIsOpenModalAuth, setIsOpenSettings} = useContext(AppContext);
    const [auth, setAuth] = useState<boolean>(false);
    useEffect(() => {
        setAuth(isAuthenticated);
    }, [isAuthenticated]);
    const handleOpenClick = (typeUser: string) => {
        if (typeUser === "guest" ) {
            setIsOpenModalAuth(true);
        } else if (typeUser === "authUser" ) {
            setIsOpenSettings(true);
        }

    };
    return (
        <div className={cn(className, styles.header)}>
            <div className={styles.logo}>{children}</div>
            <div className={cn({
                [styles.guest]: !auth,
                [styles.user]: auth
            })}>
                {!auth ?
                    <button onClick={() => handleOpenClick("guest")}>Войти</button> :

                    <button onClick={() => handleOpenClick("authUser")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <circle cx="16" cy="7.48" r="5.48"/>
                            <path
                                d="M23.54,30H8.46a4.8,4.8,0,0,1-4.8-4.8h0A10.29,10.29,0,0,1,13.94,14.92h4.12A10.29,10.29,0,0,1,28.34,25.2h0A4.8,4.8,0,0,1,23.54,30Z"/>
                        </svg>

                    </button>
                }
            </div>
        </div>
    );
};