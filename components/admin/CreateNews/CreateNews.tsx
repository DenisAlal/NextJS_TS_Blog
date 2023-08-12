
import React from 'react';
import styles from './createNews.module.css';
import {P, Tag} from "@/components";

function CreateNews() {


    return (

            <div className={styles.main}>
                <P size="l" className={styles.tagTitle}>Создать новость</P>
                <P size="m">Введите название новости</P>
                <input className={styles.newsName}/>
                <P size="m">Введите содержание новости</P>
                <textarea></textarea>
            </div>

    );
}
export default CreateNews;

