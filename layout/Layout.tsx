import {LayoutProps} from './Layout.props';
import styles from './Layout.module.css';
import {Header} from './Header/Header';
import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Sidebar} from './Sidebar/Sidebar';
import {Footer} from './Footer/Footer';
import {AppContext, AppContextProvider, AppContextType} from '@/context/app.context';
import {ModalAuth, ModalSettings} from "@/components";
import AuthUser from "@/utils/auth";

const Layout = ({children}: LayoutProps): JSX.Element => {
    const {isOpenModalAuth, isOpenSettings} = useContext(AppContext);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalSettings, setOpenModalSettings] = useState<boolean>(false);
    useEffect(() => {
        if (isOpenModalAuth) {
            setOpenModal(true);
        } else {
            setOpenModal(false);
        }
    }, [isOpenModalAuth]);
    useEffect(() => {
        if (isOpenSettings) {
            setOpenModalSettings(true);
        } else {
            setOpenModalSettings(false);
        }
    }, [isOpenSettings]);
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header}/>
            <Sidebar className={styles.sidebar}/>
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

        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & AppContextType>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    };
};