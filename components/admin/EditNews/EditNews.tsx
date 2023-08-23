import React, {useEffect, useRef, useState} from 'react';
import styles from './editNews.module.css';
import {P} from "@/components";
import axios from "axios";
import {Editor} from "@tinymce/tinymce-react";
import parse from 'html-react-parser';
import {BlogData} from "@/interfaces/blogData.interface";


function EditNews() {
    const editorRef = useRef(0);
    const [editMode, setEditMode] = useState<number | null>(null);
    const [cardName, setCardName] = useState('');
    const [cardData, setCardData] = useState('');
    const [data, setData] = useState<BlogData[]>([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<BlogData[]>(process.env.NEXT_PUBLIC_DOMAIN + 'data');
                setData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, []);

    async function handleSave(id: number) {
        const updatedItem = {
            id,
            blog_data_name: cardName,
            blog_data: cardData,
        };

        axios.put<BlogData>(process.env.NEXT_PUBLIC_DOMAIN + `data/${id}`, updatedItem)
            .then(function () {
                setData([]);
                setEditMode(null)
                updateData();
            }).catch(function (error) {
            console.log(error);
        });
    }

    function handleClose() {
        setData([]);
        setEditMode(null)
        updateData();
    }

    async function updateData() {
        try {
            const response = await axios.get<BlogData[]>(process.env.NEXT_PUBLIC_DOMAIN + 'data');
            setData(response.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
        }
    }

    const handleEdit = (id: number) => {
        const editItem = data.find((item) => item.id === id);
        if (editItem) {
            setEditMode(editItem.id);
            setCardName(editItem.blog_data_name);
            setCardData(editItem.blog_data);
        }
    };


    const handleDelete = async (id: number) => {
        try {
            await axios.delete(process.env.NEXT_PUBLIC_DOMAIN + `data/${id}`);
            const updatedData = data.filter((item) => item.id !== id);
            setData(updatedData);
            setDeleteConfirmation(null);
        } catch (error) {
            console.error('Ошибка при удалении данных:', error);
        }
    };


    return (
        <>
            <div className={styles.block}>
                <P size="l" className={styles.tagTitle}>Редактировать новость</P>
                {data.map((item) => (
                    <div key={item.id}>
                        {editMode === item.id ? (
                            <>
                                <div className={styles.data_name_edit}>Редактирование новости</div>
                                <div className={styles.content}>
                                    <input
                                        className={styles.newsName}
                                        value={cardName}
                                        onChange={(event) => setCardName(event.target.value)}
                                    />

                                    <p>Введите содержание новости</p>
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

                                    <button onClick={() => handleSave(item.id)}>Сохранить</button>
                                    <button onClick={() => handleClose()}>Отменить</button>
                                </div>
                            </>
                        ) : (
                            <div>
                                <div className={styles.data_name}>{item.blog_data_name}</div>
                                <div className={styles.content}>
                                    <div>{parse(item.blog_data)}</div>
                                    <button onClick={() => handleEdit(item.id)}>Редактировать</button>
                                    <button onClick={() => setDeleteConfirmation(item.id)}>Удалить</button>
                                    {deleteConfirmation === item.id && (
                                        <div>
                                            <p>Вы действительно хотите удалить эту запись?</p>
                                            <button onClick={() => handleDelete(item.id)}>Да</button>
                                            <button onClick={() => setDeleteConfirmation(null)}>Нет</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                        )}
                    </div>
                ))}
            </div>


        </>
    );
}

export default EditNews;

