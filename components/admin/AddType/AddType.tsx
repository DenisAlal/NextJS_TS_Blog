import React, {useRef, useState} from 'react';
import styles from './AddType.module.css';
import {P,} from "@/components";
import axios from "axios";
import {Editor} from "@tinymce/tinymce-react";

function AddType() {
    const [blogTypeName, setBlogTypeName] = useState("");
    const [blogNameDescription, setBlogNameDescription] = useState("");
    const editorRef = useRef(0);
    async function sendData() {

        axios.post(process.env.NEXT_PUBLIC_DOMAIN + 'blogType', {
            blog_type_name: blogTypeName,
            description: blogNameDescription,
        }).then(function (response) {
            console.log(response.data);
            setBlogTypeName("");
            setBlogNameDescription("");
        }).catch(function (error) {
            console.log(error);
        });
    }


    return (
        <div>
            <P size="l" className={styles.tagTitle}>Создать новую тему</P>
            <div className={styles.main}>
                <P size="m">Введите новую тему</P>
                <input className={styles.newsName} value={blogTypeName}
                       onChange={(event) => setBlogTypeName(event.target.value)}/>
                <P size="m">О чем данная тема?</P>
                <div className={styles.editor}>
                <Editor
                    onInit={(evt, editor) => editorRef.current = Number(editor)}
                    id="editor"
                    value={blogNameDescription}
                    onEditorChange={setBlogNameDescription}
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
                <button onClick={() => sendData()}>Создать</button>

            </div>
        </div>
    );
}

export default AddType;

