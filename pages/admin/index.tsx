
import React, {useContext, useEffect} from 'react';
import { withLayout } from '@/layout/Layout';
import styles from './admin.module.css';
import {AppContext} from "@/context/app.context";
import {useRouter} from "next/router";
import {UserContext} from "@/context/user.context";
import CreateNews from "@/components/admin/CreateNews/CreateNews";
import EditNews from "@/components/admin/EditNews/EditNews";

function Admin() {
    const { userData } = useContext(AppContext);
    const { usingTab } = useContext(UserContext);
    const router = useRouter();
    useEffect(() => {
        if (Object.entries(userData).length !== 0) {
            const typeUser = userData.user.role;
            if (typeUser !== "admin") {
                router.push('/');
            }
        }
    }, [userData]);
    const renderTextComponent = () => {
        switch (usingTab) {
            case 'CreateNews':
                return <CreateNews/>;
            case 'EditNews':
                return <EditNews/>;
            default:
                return null;
        }
    };
    return (
        <>
           <span className={styles.aboba}>
                {usingTab && renderTextComponent()}
           </span>
        </>
    );
}
export default withLayout(Admin);

