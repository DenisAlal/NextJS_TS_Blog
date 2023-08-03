import {ModalAuthProps} from "@/components/ModalAuth/ModalAuth.props";
import styles from './ModalMenu.module.css'
import React, {useContext, useEffect, useState} from "react";
import {AppContext, UserData} from "@/context/app.context";

export const ModalMenu = ({children, className}: ModalAuthProps): JSX.Element => {
    const {setIsOpenMenu} = useContext(AppContext);

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
                        <button className={styles.tbutton}>12312</button>
                        <button className={styles.tbutton}>12312</button>

                    </div>
                </div>
            </div>
        </div>
    );
};