import ReactModal from 'react-modal';
import { useState, FormEvent, ChangeEvent, FC, useContext } from 'react';
import React from 'react';
import styled from 'styled-components';
import { UserInfo } from './App';

type Props = {
    isOpen: boolean;
    closeLDialog: () => void;
}

export const LoginDialog: FC<Props> = props => {

    let { isOpen, closeLDialog } = props;

    const _sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const { userId, setUserId, userName, setUserName } = useContext(UserInfo);

    const [pandaID, setPandaID] = useState<string>("");

    const customStyles: ReactModal.Styles = {
        // ダイアログ内のスタイル（中央に表示）
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        },
        // 親ウィンドウのスタイル（ちょっと暗くする）
        overlay: {
            left: '0%',
            background: 'rgba(0, 0, 0, 0.2)',
            width: '100%',
            zIndex: '10'
        }
    }

    const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch('/searchID', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: pandaID
            })
        })
            .then(res => {
                if (res.status === 200) {
                    closeLDialog();
                }
            })
            .catch(error => {
                console.error(error);
            })

        await _sleep(2000);

        fetch('/searchID', { method: 'GET' })
            .then(res => res.json())
            .then(data => {
                setUserId(data.id);
                setUserName(data.name);
            })

        setPandaID("");
    }

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setPandaID(e.target.value);
    }


    return (
        <>
            <ReactModal
                isOpen={isOpen}
                style={customStyles}
                contentLabel="Settings"
            >
                <form onSubmit={handleSubmit} action="/" method="post">
                    <label> 名前をフルネームで入力(スペースなし)⇒
                        <input type="text" autoFocus value={pandaID}
                            onChange={handleChangeUsername} name="itemName"></input>
                        <input type="submit" value="ログイン"></input>
                    </label>
                </form>
            </ReactModal>
        </>
    );
}