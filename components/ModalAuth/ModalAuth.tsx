import {ModalAuthProps} from "@/components/ModalAuth/ModalAuth.props";
import styles from './ModalAuth.module.css'
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "@/context/app.context";
import Link from "next/link";
import axios from "axios";
import cn from "classnames";
import {useRouter} from "next/router";
export const ModalAuth = ({children, className}: ModalAuthProps): JSX.Element => {
    const {setIsOpenModalAuth,userData} = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('login');
    const [errorLogin, setErrorLogin]= useState('');
    const [errorRegister, setErrorRegister]= useState('');
    const [successRegister, setSuccessRegister]= useState(false);
    const [count, setCount] = useState(5);
    const [formDataLogin, setFormDataLogin] = useState({
        email: '',
        password: '',
    });
    const [formDataRegister, setFormDataRegister] = useState({
        username: '',
        email: '',
        password: '',
        passwordCheck: ''
    });
    const router = useRouter();
    function handleCloseClick() {
        setIsOpenModalAuth(false);
    }
    const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormDataRegister(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormDataLogin(prevData => ({
            ...prevData,
            [name]: value
        }));
    };
    const setLoginAfterRegister = (email: string, password: string) => {
        setFormDataLogin(prevData => ({
            ...prevData,
            email: email,
            password: password
        }));
        setSuccessRegister(true);
    };
    async function login() {
        setErrorLogin('');
        console.log(process.env.NEXT_PUBLIC_DOMAIN);
        console.log(formDataLogin.email, formDataLogin.password);
        axios.post(process.env.NEXT_PUBLIC_DOMAIN + 'login', {
            email: formDataLogin.email,
            password: formDataLogin.password
        }).then(function(response) {
            const {token} = response.data.authorization;
            localStorage.setItem('jwtToken', token);
            setIsOpenModalAuth(false);
            router.push('/home');
        }).catch(function(error) {
            localStorage.setItem('jwtToken', '');
            setErrorLogin('Неправильно введен логин или пароль!');
            console.log(error);
        });
    }

    async function register() {
        if (formDataRegister.password === formDataRegister.passwordCheck) {
            setErrorRegister('');
            console.log(process.env.NEXT_PUBLIC_DOMAIN);
            console.log(formDataRegister);
            axios.post(process.env.NEXT_PUBLIC_DOMAIN + 'register', {
                name: formDataRegister.username,
                email: formDataRegister.email,
                password: formDataRegister.password,
                role: 'user'
            }).then(function(response) {
                console.log(response.data)
                setLoginAfterRegister(formDataRegister.email, formDataRegister.password);
            }).catch(function(error) {
                localStorage.setItem('jwtToken', '');
                setErrorLogin('Ошибка! Такой прользователь уже существует!');
                console.log(error);
            });
        } else {
            setErrorRegister('Подтверждение пароля не выполенно, пароль должен совпадать!');
        }

    }

    useEffect(() => {
        if (successRegister) {
            const timer = setInterval(() => {
                setCount(prevCount => prevCount - 1);
            }, 1000);
            if (count === 0) {
                clearInterval(timer);
                login();
            }
            return () => {
                clearInterval(timer); // Остановить интервал при размонтировании компонента
            };
        }

    }, [count, successRegister]);
     const cancelGoHome = () => {
         setSuccessRegister(false);
         setActiveTab('login');
         setCount(5);
     };
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
                                <input name="email" value={formDataLogin.email} onChange={handleChangeLogin} type="email"/>
                            </div>
                            <div className={styles.input}>
                                <label>Пароль</label>
                                <input name="password" value={formDataLogin.password} onChange={handleChangeLogin} type="password"/>
                            </div>
                            <div className={styles.link}>
                                <Link href={"/reset"}>
                                    Забыли пароль?
                                </Link>
                            </div>
                            {errorLogin !== '' && <div className={cn(styles.error)}>{errorLogin}</div>}
                            <button onClick={() => login()} className={styles.signin}>
                                Войти
                            </button>
                        </div> :
                     <div className={`${activeTab === 'registration' ? styles.registration : ''}`}>
                         {successRegister ? (
                             <div className={styles.sucessAlert}>
                                 <p>Регистрация выполнена успешно!</p>
                                 <p>Переход на домашнюю страницу через {count}</p>
                                 <button className={cn(styles.buttonreg, {
                                     [styles.buttonregBack]: successRegister
                                 })} onClick={() => cancelGoHome()}>Отмена</button>
                             </div>
                         ) : (
                             <div >
                                 <div className={styles.input}>
                                     <label>Ваше имя</label>
                                     <input type="text" name="username" value={formDataRegister.username} onChange={handleChangeRegister}/>
                                 </div>
                                 <div className={styles.input}>
                                     <label>Почта</label>
                                     <input type="email" name="email" value={formDataRegister.email} onChange={handleChangeRegister}/>
                                 </div>
                                 <div className={styles.input}>
                                     <label>Пароль</label>
                                     <input type="password" name="password" value={formDataRegister.password} onChange={handleChangeRegister}/>
                                 </div>
                                 <div className={styles.input}>
                                     <label>Повторите пароль</label>
                                     <input type="password" name="passwordCheck" value={formDataRegister.passwordCheck} onChange={handleChangeRegister}/>
                                 </div>
                                 {errorRegister !== '' && <div className={cn(styles.error, {
                                     [styles.mt]: errorRegister !== '',
                                 })}>{errorRegister}</div>}
                                 <button className={cn(styles.buttonreg)} onClick={() => register()}>Зарегистрироваться </button>
                             </div>
                         )}
                     </div>

                    }

                    <div className={styles.mbody}>{children}</div>
                </div>
            </div>
        </div>
    );
};