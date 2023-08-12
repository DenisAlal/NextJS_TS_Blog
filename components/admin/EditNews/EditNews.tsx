
import React from 'react';
import styles from './editNews.module.css';
import {P} from "@/components";

function EditNews() {

    return (
        <>
            <P size="l" className={styles.tagTitle}>Редактировать новость</P>
            <div className={styles.main}>
                <div className={styles.textTest}>Абоба абобовна обабобилась на абобовом рынке когда покупала помидоры для абоб</div>
                <div className={styles.textTest}>Абоба абобовна обабобилась на абобовом рынке когда покупала помидоры для абоб</div>
                <div className={styles.textTest}>Абоба абобовна обабобилась на абобовом рынке когда покупала помидоры для абоб</div>
                <div className={styles.textTest}>Абоба абобовна обабобилась на абобовом рынке когда покупала помидоры для абоб</div>

            </div>
        </>
    );
}
export default EditNews;

