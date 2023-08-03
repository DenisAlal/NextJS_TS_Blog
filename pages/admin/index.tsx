
import React, {useContext, useEffect} from 'react';
import { withLayout } from '@/layout/Layout';
import styles from './admin.module.css';
import {AppContext} from "@/context/app.context";
import {useRouter} from "next/router";

function Admin() {
    const { setUserData, setIsAuthenticated, userData } = useContext(AppContext);
    const router = useRouter();
    useEffect(() => {
        if (Object.entries(userData).length !== 0) {
            const typeUser = userData.user.role;
            if (typeUser !== "admin") {
                router.push('/');
            }
        }
    }, [userData]);

    return (
        <>
           <span className={styles.aboba}>
               adminka lytaua
           </span>
        </>
    );
}

export default withLayout(Admin);

