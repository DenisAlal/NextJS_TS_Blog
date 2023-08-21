import React, {useContext, useEffect, useState} from 'react';
import {withLayout} from '@/layout/Layout';
import parse from "html-react-parser";
import axios from "axios";
import {BlogData} from "@/interfaces/blogData.interface";
import styles from './home.module.css'
import {UserContext} from "@/context/user.context";
import {BlogType} from "@/interfaces/blogType.interface";

function Home() {
    const [data, setData] = useState<BlogData[]>([]);
    const {usingTab, setUsingTab, userTab, setUserTab} = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            console.log(process.env.NEXT_PUBLIC_DOMAIN + 'data' + `?id=${userTab}`)
            axios.get<BlogData[]>(process.env.NEXT_PUBLIC_DOMAIN + 'data' + `?id=${userTab}`)
                .then(async response => {
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
    }, [userTab]);

    return (
        <>
                <div>
                    {data.length ? (
                        data.map((item) => (
                            <div className={styles.block} key={item.id}>
                                <div className={styles.data_name}>{item.blog_data_name}</div>
                                <div className={styles.content}>
                                    <div>{parse(item.blog_data)}</div>
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

