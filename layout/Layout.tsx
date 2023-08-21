import {LayoutProps} from './Layout.props';
import styles from './Layout.module.css';
import {Header} from './Header/Header';
import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Sidebar} from './Sidebar/Sidebar';
import {Footer} from './Footer/Footer';
import {AppContext, AppContextProvider, AppContextType} from '@/context/app.context';
import {ModalAuth, ModalMenu, ModalSettings} from "@/components";
import AuthUser from "@/utils/auth";
import {useRouter} from "next/router";
import {UserContextProvider} from "@/context/user.context";

const Layout = ({children}: LayoutProps): JSX.Element => {
    const router = useRouter();
    const [auth, setAuth] = useState<boolean>(false);
    const [userMenu, setUserMenu] = useState<boolean>(false);
    const {isOpenModalAuth, isOpenSettings, userData, isOpenMenu} = useContext(AppContext);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalSettings, setOpenModalSettings] = useState<boolean>(false);
    const [openModalMenu, setOpenModalMenu] = useState<boolean>(false);
    useEffect(() => {
        if (isOpenModalAuth) {
            setOpenModal(true);
        } else {
            setOpenModal(false);
        }
    }, [isOpenModalAuth]);
    useEffect(() => {
        if (isOpenMenu) {
            setOpenModalMenu(true);
        } else {
            setOpenModalMenu(false);
        }

    }, [isOpenMenu]);
    useEffect(() => {
        if (isOpenSettings) {
            setOpenModalSettings(true);
        } else {
            setOpenModalSettings(false);
        }
    }, [isOpenSettings]);
    useEffect(() => {
        if (router.pathname === "/admin") {
            if (Object.entries(userData).length !== 0) {
                const typeUser = userData.user.role;
                if (typeUser !== "admin") {
                    router.push('/');
                } else {
                    setAuth(true);

                }
            }
        } else if (router.pathname === "/home") {
            setUserMenu(true);
        }
    }, [router, userData]);


    return (
        <div className={styles.wrapper}>
            <Header className={styles.header}>
                <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M19 9.77806V16.2C19 17.8801 19 18.7202 18.673 19.3619C18.3854 19.9264 17.9265 20.3854 17.362 20.673C16.7202 21 15.8802 21 14.2 21H9.8C8.11984 21 7.27976 21 6.63803 20.673C6.07354 20.3854 5.6146 19.9264 5.32698 19.3619C5 18.7202 5 17.8801 5 16.2V9.7774M21 12L15.5668 5.96393C14.3311 4.59116 13.7133 3.90478 12.9856 3.65138C12.3466 3.42882 11.651 3.42887 11.0119 3.65153C10.2843 3.90503 9.66661 4.59151 8.43114 5.96446L3 12M14 12C14 13.1045 13.1046 14 12 14C10.8954 14 10 13.1045 10 12C10 10.8954 10.8954 9.99996 12 9.99996C13.1046 9.99996 14 10.8954 14 12Z"
                        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Header>
            {auth &&
                <Sidebar className={styles.sidebar} typeSidebar="admin"/>
            }
            {userMenu &&
                <Sidebar className={styles.sidebar} typeSidebar="user"/>
            }
            <AuthUser/>
            <div className={styles.body}>
                {children}
            </div>
            <Footer className={styles.footer}/>
            {openModal &&
                <div className={styles.smooth}>
                    <ModalAuth/>
                </div>
            }
            {openModalSettings &&
                <div className={styles.smooth}>
                    <ModalSettings/>
                </div>
            }
            {openModalMenu &&
                <div className={styles.smooth}>
                    <ModalMenu/>
                </div>
            }

        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & AppContextType>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider>
                <UserContextProvider>
                    <Layout>
                        <Component {...props} />
                    </Layout>
                </UserContextProvider>
            </AppContextProvider>
        );
    };
};