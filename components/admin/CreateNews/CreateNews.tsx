import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './createNews.module.css';
import {P,} from "@/components";
import {Editor} from '@tinymce/tinymce-react';
import axios from "axios";
import {BlogType} from "@/interfaces/blogType.interface";

function CreateNews() {
    const editorRef = useRef(0);
    const [cardName, setCardName] = useState("");
    const [cardData, setCardData] = useState("");

    const [blogType, setBlogType] = useState<BlogType[]>([]);
    const [blogTypeId, setBlogTypeId] = useState(1);
    async function sendData() {
        console.log(blogTypeId)
        axios.post(process.env.NEXT_PUBLIC_DOMAIN + 'data', {
            blog_data_name: cardName,
            blog_data: cardData,
            image_id: null,
            video_id: null,
            blog_type_id: blogTypeId
        }).then(function () {
            setBlogTypeId(1);
            setCardData("");
            setCardName("");
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<BlogType[]>(process.env.NEXT_PUBLIC_DOMAIN + 'blogType');
                setBlogType(response.data);

            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <P size="l" className={styles.tagTitle}>Создать новость</P>
            <div className={styles.main}>
                <P size="m">Введите название новости</P>
                <input className={styles.newsName} value={cardName}
                       onChange={(event) => setCardName(event.target.value)}/>
                <P size="m">Введите содержание новости</P>
                <div className={styles.editor}>
                    <Editor
                        onInit={(evt, editor) => editorRef.current = Number(editor)}
                        id="editor"
                        value={cardData}
                        onEditorChange={setCardData}
                        init={{

                            height: 500,
                            menubar: true,
                            plugins: [
                                'link', 'wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help | link | fontsize ',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </div>

                <select onChange={(e) => setBlogTypeId(parseInt(e.target.value))}>
                    {blogType.map((item) => (
                        <option key={item.id} value={item.id}>{item.blog_type_name}</option>
                    ))}
                </select>

                <button onClick={() => sendData()}>Создать</button>
            </div>
        </div>
    );
}

export default CreateNews;

