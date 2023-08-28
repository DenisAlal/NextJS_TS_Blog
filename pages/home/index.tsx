import React, {useContext, useEffect, useState} from 'react';
import {withLayout} from '@/layout/Layout';
import parse from "html-react-parser";
import axios from "axios";
import {BlogData} from "@/interfaces/blogData.interface";
import styles from './home.module.css'
import {UserContext} from "@/context/user.context";
import {LoadContext} from "@/context/load.context";
import {useSpring, animated} from "react-spring";
import {Button} from "@/components";
import {AppContext} from "@/context/app.context";

function Home() {
    const [data, setData] = useState<BlogData[]>([]);
    const {userTab} = useContext(UserContext);
    const {userData} = useContext(AppContext);
    const {setIsLoading} = useContext(LoadContext);
    const [needReload, setNeedReload] = useState(0)
    const [commentData, setCommentData] = useState("")
    const [editCommentData, setEditCommentData] = useState("")
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
    const addLike = (id: BlogData) => {
        const jwtToken = localStorage.getItem('jwtToken');
        console.log(process.env.NEXT_PUBLIC_DOMAIN + `blog/${id}/like`);
        console.log(`Bearer ${jwtToken}`);

        axios
            .post(process.env.NEXT_PUBLIC_DOMAIN + `blog/${id.id}/like`, {}, {
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

    const [expandedComments, setExpandedComments] = useState<{ [id: string]: boolean }>({});
    const [editComment, setEditComment] = useState<{ [id: string]: boolean }>({});
    const sendComment = (id: number) => {
        if (commentData !== "") {
            const jwtToken = localStorage.getItem('jwtToken');
            axios
                .post(process.env.NEXT_PUBLIC_DOMAIN + `blog/${id}/comment`, {
                    data: commentData,
                    username: userData.user.name
                }, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                })
                .then((response) => {
                    console.log(response.data.message);
                    setNeedReload(needReload + 1);
                    setCommentData("")

                })
                .catch((error) => {
                    console.log(error.response.data.message);
                    setNeedReload(needReload + 1);
                });
        } else {
            alert("Вы не ввели никаких данных, комментарий не будет отправлен!");
        }

    };
    const sendEditComment = (id: number) => {
        if (editCommentData !== "") {
            const jwtToken = localStorage.getItem('jwtToken');
            axios
                .post(process.env.NEXT_PUBLIC_DOMAIN + `blog/${id}/comment`, {
                    data: editCommentData,
                    username: userData.user.name,
                    comment_id: id
                }, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                })
                .then((response) => {
                    console.log(response.data.message);
                    setNeedReload(needReload + 1);
                    editCommentFunc(id)
                    setEditCommentData("")
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                    setNeedReload(needReload + 1);
                });
        } else {
            alert("Вы не ввели никаких данных, комментарий не будет изменен!");
        }
    }
    const toggleComment = (id: number) => {
        setExpandedComments((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
        console.log(expandedComments);
    };
    const editCommentFunc = (id: number, data?: string) => {
        if (data) {
            setEditCommentData(data);
        }
        setEditComment((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
        console.log(editComment);
    };

    return (
        <>
            <div>
                {data.length ? (
                    data.map((item) => (
                        <div className={styles.block} key={item.id}>
                            <div className={styles.data_name}>{item.blog_data_name}</div>
                            <div className={styles.content}>
                                <div>{parse(item.blog_data)}</div>
                                <div className={styles.buttonsBlock}>
                                    <div className={styles.likedislike}>
                                        <button onClick={() => addLike(item)}
                                                className={`${styles.like} ${item.liked_by_user ? styles.activelike : ''}`}
                                        >{item.like_count}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                                 viewBox="0 0 24 24" fill="#080341">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M15.0501 7.04419C15.4673 5.79254 14.5357 4.5 13.2163 4.5C12.5921 4.5 12.0062 4.80147 11.6434 5.30944L8.47155 9.75H5.85748L5.10748 10.5V18L5.85748 18.75H16.8211L19.1247 14.1428C19.8088 12.7747 19.5406 11.1224 18.4591 10.0408C17.7926 9.37439 16.8888 9 15.9463 9H14.3981L15.0501 7.04419ZM9.60751 10.7404L12.864 6.1813C12.9453 6.06753 13.0765 6 13.2163 6C13.5118 6 13.7205 6.28951 13.627 6.56984L12.317 10.5H15.9463C16.491 10.5 17.0133 10.7164 17.3984 11.1015C18.0235 11.7265 18.1784 12.6814 17.7831 13.472L15.8941 17.25H9.60751V10.7404ZM8.10751 17.25H6.60748V11.25H8.10751V17.25Z"/>
                                            </svg>
                                        </button>
                                        <button onClick={() => addDislike(item.id)}
                                                className={`${styles.dislike} ${item.disliked_by_user ? styles.activedislike : ''}`}>{item.dislike_count}
                                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#080341"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                      d="M15.0501 16.9558C15.4673 18.2075 14.5357 19.5 13.2164 19.5C12.5921 19.5 12.0063 19.1985 11.6435 18.6906L8.47164 14.25L5.85761 14.25L5.10761 13.5L5.10761 6L5.85761 5.25L16.8211 5.25L19.1247 9.85722C19.8088 11.2253 19.5407 12.8776 18.4591 13.9592C17.7927 14.6256 16.8888 15 15.9463 15L14.3982 15L15.0501 16.9558ZM9.60761 13.2596L12.8641 17.8187C12.9453 17.9325 13.0765 18 13.2164 18C13.5119 18 13.7205 17.7105 13.6271 17.4302L12.317 13.5L15.9463 13.5C16.491 13.5 17.0133 13.2836 17.3984 12.8985C18.0235 12.2735 18.1784 11.3186 17.7831 10.528L15.8941 6.75L9.60761 6.75L9.60761 13.2596ZM8.10761 6.75L6.60761 6.75L6.60761 12.75L8.10761 12.75L8.10761 6.75Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <Button appearance={"primary"} onClick={() => toggleComment(item.id)}
                                            className={styles.buttonComments}>
                                        Комментарии
                                    </Button>
                                </div>

                                {expandedComments[item.id] && (
                                    <div className={styles.commentsBlock}>
                                        <span className={styles.commentsTitle}>Комментарии:</span>
                                        {item.comments.length > 0 ? item.comments.map((comment) =>

                                            <div className={styles.comments} key={comment.id}>
                                                <div
                                                    className={styles.commentData}>
                                                    <span>{comment.username}</span>
                                                    <div className={styles.divider}></div>
                                                    {comment.data}</div>
                                                {comment.user_id === userData.user.id &&
                                                    <div><a className={styles.editButton}
                                                            onClick={() => editCommentFunc(comment.id, comment.data)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15px"
                                                             height="15px" viewBox="0 0 24 24" fill="none"
                                                             className={styles.edit}>
                                                            <path
                                                                d="M9.65661 17L6.99975 17L6.99975 14M6.10235 14.8974L17.4107 3.58902C18.1918 2.80797 19.4581 2.80797 20.2392 3.58902C21.0202 4.37007 21.0202 5.6364 20.2392 6.41745L8.764 17.8926C8.22794 18.4287 7.95992 18.6967 7.6632 18.9271C7.39965 19.1318 7.11947 19.3142 6.8256 19.4723C6.49475 19.6503 6.14115 19.7868 5.43395 20.0599L3 20.9998L3.78312 18.6501C4.05039 17.8483 4.18403 17.4473 4.3699 17.0729C4.53497 16.7404 4.73054 16.424 4.95409 16.1276C5.20582 15.7939 5.50466 15.4951 6.10235 14.8974Z"
                                                                stroke="#000000" strokeWidth="2" strokeLinecap="round"
                                                                strokeLinejoin="round"/>
                                                        </svg>
                                                    </a>

                                                    </div>

                                                }
                                                {editComment[comment.id] &&
                                                    <div className={styles.input}>
                                                        <label>Напишите комментарий:</label>
                                                        <textarea name="text" maxLength={500} value={editCommentData}
                                                                  onChange={(event) => setEditCommentData(event.target.value)}></textarea>
                                                        <Button appearance={"primary"} className={styles.button}
                                                                onClick={() => sendEditComment(comment.id)}
                                                                id="sendCommentEditId">Отправить изменения</Button>

                                                    </div>
                                                }


                                            </div>
                                        ) : <div>Пока никто не прокомментировал. </div>}
                                        <div className={styles.input}>
                                            <label>Напишите комментарий:</label>
                                            <textarea name="text" maxLength={500} value={commentData}
                                                      onChange={(event) => setCommentData(event.target.value)}/>
                                        </div>
                                        <Button appearance={"primary"} className={styles.button}
                                                onClick={() => sendComment(item.id)} id="sendComment">Отправить</Button>
                                    </div>
                                )}
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

