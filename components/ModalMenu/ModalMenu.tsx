import {ModalAuthProps} from "@/components/ModalAuth/ModalAuth.props";
import styles from './ModalMenu.module.css'
import React, {useContext} from "react";
import {AppContext} from "@/context/app.context";
import {UserContext} from "@/context/user.context";

export const ModalMenu = ({children, className}: ModalAuthProps): JSX.Element => {
    const {setIsOpenMenu} = useContext(AppContext);
    const {usingTab, setUsingTab} = useContext(UserContext);

    function handleCloseClick() {
        setIsOpenMenu(false);
    }



    return (
        <div className={styles.moverlay}>
            <div className={styles.mwrapper}>
                <div className={styles.modal}>
                    <div className={styles.mheader}>
                        <span >Меню</span>
                        <a href="#" onClick={() => handleCloseClick()} >
                            ✖
                        </a>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.mbody}>
                        <div className={styles.sidebarButtons}>
                            <button className={`${styles.tbutton} ${usingTab === 'CreateNews' ? styles.active : ''}`}
                                    onClick={() => {setUsingTab('CreateNews'); handleCloseClick();}}>
                                Создать новость
                            </button>
                            <button className={`${styles.tbutton} ${usingTab === 'EditNews' ? styles.active : ''}`}
                                    onClick={() => {setUsingTab('EditNews'); handleCloseClick();}}>
                                Редактировать новость
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};