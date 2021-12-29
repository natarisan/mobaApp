import { useState, useEffect, FormEvent, ChangeEvent, FC } from 'react';
import axios from 'axios';


export const BulletinBoard = () => {

	const[file, setFile] = useState<string|Blob>("");
    const [fileName, setFileName] = useState<string>("");
    const [images, setImage] = useState<any>();
    let image: any;


    const saveFile = (e: any) => {
		setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);

	};

    const uploadFile = async () => {
        const header = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }

        const formData = new FormData();
        formData.append("file", file);
        try {
            const res = await axios.post(
                "/upload",
                formData,
                header
            );
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }

        fetch('/upload', {
            method: 'GET',
            headers: {
                'Content-Type': 'image/png',
                'responseType': 'arraybuffer'
            }
        })
            .then(res => res.json())
            .then(data => {
                setImage(data.file);
            })
    };

    return (
        <>
        <div>
            <input type="file" onChange={saveFile} />
            <button onClick={uploadFile}>Upload</button>
        </div>
            <img src={`data:image/jpg;base64,${images}`} width="300" height="300"/>
        </>
    );

}