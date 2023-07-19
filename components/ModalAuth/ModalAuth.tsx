import {ModalAuthProps} from "@/components/ModalAuth/ModalAuth.props";
import styles from './ModalAuth.module.css'
import React, {useContext, useState} from "react";
import {AppContext} from "@/context/app.context";
import Link from "next/link";
import axios from "axios";
export const ModalAuth = ({children, className}: ModalAuthProps): JSX.Element => {
    const {setIsOpenModalAuth} = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('login');
    const [emailLogin, setEmailLogin]= useState('');
    const [passwordLogin, setPasswordLogin]= useState('');
    const [errorLogin, setErrorLogin]= useState('');
    function handleCloseClick() {
        setIsOpenModalAuth(false);
    }

    async function login() {
        setErrorLogin('');
        console.log(process.env.NEXT_PUBLIC_DOMAIN);
        axios.post(process.env.NEXT_PUBLIC_DOMAIN + 'login', {
            email: emailLogin,
            password: passwordLogin
        }).then(function(response) {
            const {token} = response.data.authorization;
            localStorage.setItem('jwtToken', token);


        }).catch(function(error) {
            localStorage.setItem('jwtToken', '');
            setErrorLogin('Неправильно введен логин или пароль!');
            console.log(error);
        });
    }

    return (
        <div className={styles.moverlay}>
            <div className={styles.mwrapper}>
                <div className={styles.modal}>
                    <div className={styles.mheader}>
                        <a href="#" onClick={() => handleCloseClick()} className="text-sm text-black">
                            ✖
                        </a>
                    </div>
                    <div className={styles.tabs}>
                        <button className={`${styles.tbutton} ${activeTab === 'login' ? styles.active : ''}`}
                                onClick={() => setActiveTab('login')}>
                            Авторизация
                        </button>
                        <button className={`${styles.tbutton} ${activeTab === 'registration' ? styles.active : ''}`}
                                onClick={() => setActiveTab('registration')}>
                            Регистрация
                        </button>

                    </div>
                    {activeTab === "login" ?
                        <div className={`${activeTab === 'login' ? styles.login : ''}`}>
                            <div className={styles.input}>
                                <label>Почта</label>
                                <input value={emailLogin} onChange={event => setEmailLogin(event.target.value)} type="email"/>
                            </div>
                            <div className={styles.input}>
                                <label>Пароль</label>
                                <input value={passwordLogin} onChange={event => setPasswordLogin(event.target.value)} type="password"/>
                            </div>
                            <div className={styles.link}>
                                <Link href={"/reset"}>
                                    Забыли пароль?
                                </Link>
                            </div>
                            {errorLogin !== '' && <div className={styles.error}>{errorLogin}</div>}
                            <button onClick={() => login()} className={styles.signin}>
                                Войти
                            </button>
                        </div> :
                        <div className={`${activeTab === 'registration' ? styles.registration : ''}`}>
                            <div className={styles.input}>
                                <label>Ваше имя</label>
                                <input type="text"/>
                            </div>
                            <div className={styles.input}>
                                <label>Почта</label>
                                <input type="email"/>
                            </div>
                            <div className={styles.input}>
                                <label>Пароль</label>
                                <input type="password"/>
                            </div>
                            <div className={styles.input}>
                                <label>Повторите пароль</label>
                                <input type="password"/>
                            </div>
                            <button className={styles.buttonreg}>Зарегистрироваться </button>
                        </div>
                    }

                    <div className={styles.mbody}>{children}</div>
                </div>
            </div>
        </div>
    );
};