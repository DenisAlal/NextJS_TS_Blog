import React, {useContext, useEffect, useState} from 'react';
import {withLayout} from '@/layout/Layout';
import parse from "html-react-parser";
import axios from "axios";
import {BlogData} from "@/interfaces/blogData.interface";
import styles from './home.module.css'
import {UserContext} from "@/context/user.context";

function Home() {
    const [data, setData] = useState<BlogData[]>([]);
    const {usingTab, setUsingTab, userTab, setUserTab} = useContext(UserContext);
    const [needReload, setNeedReload] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const jwtToken = localStorage.getItem('jwtToken');
            console.log(process.env.NEXT_PUBLIC_DOMAIN + 'data' + `?id=${userTab}`)
            axios.get<BlogData[]>(process.env.NEXT_PUBLIC_DOMAIN + 'data' + `?id=${userTab}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                })
                .then(async response => {
                    console.log(response.data);
                    setData(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        };

        if (userTab) {
            console.log(userTab);
            fetchData();
        }
    }, [userTab, needReload]);
    const addLike = (id: number) => {
        const jwtToken = localStorage.getItem('jwtToken');
        console.log(process.env.NEXT_PUBLIC_DOMAIN + `blog/${id}/like`);
        console.log(`Bearer ${jwtToken}`);
        axios
            .post(process.env.NEXT_PUBLIC_DOMAIN + `blog/${id}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((response) => {
                console.log(response.data);
                setNeedReload(needReload + 1)
            })
            .catch((error) => {
                console.log(error.response.data.message);
                setNeedReload(needReload + 1)
            });
    };

    // Функция для выставления дизлайка
    const addDislike = (id: number) => {
        const jwtToken = localStorage.getItem('jwtToken');
        axios
            .post(process.env.NEXT_PUBLIC_DOMAIN + `blog/${id}/dislike`, {}, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            })
            .then((response) => {
                console.log(response.data.message);
                setNeedReload(needReload + 1);
            })
            .catch((error) => {
                console.log(error.response.data.message);
                setNeedReload(needReload + 1);
            });
    };

    function checkDisabled(userButton: boolean) {
        return userButton;
    }

    return (
        <>
            <div>
                {data.length ? (
                    data.map((item) => (
                        <div className={styles.block} key={item.id}>
                            <div className={styles.data_name}>{item.blog_data_name}</div>
                            <div className={styles.content}>
                                <div>{parse(item.blog_data)}</div>
                                <button onClick={() => addLike(item.id)}
                                        disabled={checkDisabled(item.liked_by_user)}
                                        className={`${styles.like} ${item.liked_by_user ? styles.activelike : ''}`}
                                >{item.like_count}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                         viewBox="0 0 24 24" fill="#080341">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M15.0501 7.04419C15.4673 5.79254 14.5357 4.5 13.2163 4.5C12.5921 4.5 12.0062 4.80147 11.6434 5.30944L8.47155 9.75H5.85748L5.10748 10.5V18L5.85748 18.75H16.8211L19.1247 14.1428C19.8088 12.7747 19.5406 11.1224 18.4591 10.0408C17.7926 9.37439 16.8888 9 15.9463 9H14.3981L15.0501 7.04419ZM9.60751 10.7404L12.864 6.1813C12.9453 6.06753 13.0765 6 13.2163 6C13.5118 6 13.7205 6.28951 13.627 6.56984L12.317 10.5H15.9463C16.491 10.5 17.0133 10.7164 17.3984 11.1015C18.0235 11.7265 18.1784 12.6814 17.7831 13.472L15.8941 17.25H9.60751V10.7404ZM8.10751 17.25H6.60748V11.25H8.10751V17.25Z"/>
                                    </svg>
                                </button>
                                <button onClick={() => addDislike(item.id)}
                                        disabled={checkDisabled(item.disliked_by_user)}
                                        className={`${styles.dislike} ${item.disliked_by_user ? styles.activedislike : ''}`}>{item.dislike_count}
                                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#080341"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd"
                                              d="M15.0501 16.9558C15.4673 18.2075 14.5357 19.5 13.2164 19.5C12.5921 19.5 12.0063 19.1985 11.6435 18.6906L8.47164 14.25L5.85761 14.25L5.10761 13.5L5.10761 6L5.85761 5.25L16.8211 5.25L19.1247 9.85722C19.8088 11.2253 19.5407 12.8776 18.4591 13.9592C17.7927 14.6256 16.8888 15 15.9463 15L14.3982 15L15.0501 16.9558ZM9.60761 13.2596L12.8641 17.8187C12.9453 17.9325 13.0765 18 13.2164 18C13.5119 18 13.7205 17.7105 13.6271 17.4302L12.317 13.5L15.9463 13.5C16.491 13.5 17.0133 13.2836 17.3984 12.8985C18.0235 12.2735 18.1784 11.3186 17.7831 10.528L15.8941 6.75L9.60761 6.75L9.60761 13.2596ZM8.10761 6.75L6.60761 6.75L6.60761 12.75L8.10761 12.75L8.10761 6.75Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                    ))
                ) : (
                    <div>В даннном разделе пока что пусто =(((</div>
                )}
            </div>
        </>
    );
}

export default withLayout(Home);

